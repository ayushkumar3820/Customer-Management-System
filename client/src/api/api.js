import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCustomers = async () => {
  try {
    const response = await api.get("/customers");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching customers"
    );
  }
};

export const createCustomer = async (customerData) => {
  try {
    const response = await api.post("/customers", customerData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating customer");
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    const response = await api.put(`/customers/${id}`, customerData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating customer");
  }
};

export const deleteCustomer = async (id) => {
  try {
    await api.delete(`/customers/${id}`);
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error deleting customer");
  }
};

export const getMemberships = async () => {
  try {
    const response = await fetch("/memberships");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching memberships:", error);
    return [
      { _id: "507f1f77bcf86cd799439011", name: "Basic Membership" },
      { _id: "507f1f77bcf86cd799439012", name: "Standard Membership" },
      { _id: "507f1f77bcf86cd799439013", name: "Premium Membership" },
    ];
  }
};
