import React, { useState, useEffect } from "react";
import { getMemberships } from "../api/api.js";

const CustomerForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    status: "Gold",
    membershipId: "",
    ...initialData,
  });

  const [memberships, setMemberships] = useState();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMemberships();
  }, []);

  const loadMemberships = async () => {
    try {
      setLoading(true);
      const response = await getMemberships();

      if (Array.isArray(response) && response.length > 0) {
        setMemberships(response);
      }
    } catch (error) {
      console.error("Error loading memberships:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact number is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.membershipId)
      newErrors.membershipId = "Membership is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md"
    >
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md bg-white text-black border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md bg-white text-black border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md bg-white text-black border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contact Number
        </label>
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md bg-white text-black border ${
            errors.contactNumber ? "border-red-500" : "border-gray-300"
          } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
        />
        {errors.contactNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-white text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            style={{ color: "black", backgroundColor: "white" }}
          >
            <option
              value="Gold"
              style={{ color: "black", backgroundColor: "white" }}
            >
              Gold
            </option>
            <option
              value="Diamond"
              style={{ color: "black", backgroundColor: "white" }}
            >
              Diamond
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Membership
          </label>
          {loading ? (
            <div className="mt-1 flex items-center">
              <span className="text-gray-500">Loading memberships...</span>
            </div>
          ) : (
            <>
              <select
                name="membershipId"
                value={formData.membershipId || ""}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md bg-white text-black border ${
                  errors.membershipId ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              >
                <option value="">Select Membership</option>
                {Array.isArray(memberships) &&
                  memberships.map((membership) => (
                    <option key={membership._id} value={membership._id}>
                      {membership.name}
                    </option>
                  ))}
              </select>
              {errors.membershipId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.membershipId}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          disabled={loading}
        >
          {initialData._id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
