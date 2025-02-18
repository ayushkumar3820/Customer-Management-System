import React, { useState, useEffect } from 'react';
import { getCustomers, deleteCustomer, createCustomer, updateCustomer } from '../api/api.js';
import CustomerForm from './CustomerForm.jsx';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            setLoading(true);
            const data = await getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error('Error loading customers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data) => {
        try {
            if (editingCustomer) {
                await updateCustomer(editingCustomer._id, data);
            } else {
                await createCustomer(data);
            }
            loadCustomers();
            setShowForm(false);
            setEditingCustomer(null);
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await deleteCustomer(id);
                loadCustomers();
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setShowForm(true);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingCustomer(null);
    };

    const getMembershipName = (customer) => {
        return customer.membershipId?.name || 'N/A';
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900">Customer Management</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                >
                    Add New Customer
                </button>
            </div>

            {showForm && (
                <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">
                        {editingCustomer ? 'Edit Customer' : 'New Customer'}
                    </h2>
                    <CustomerForm
                        initialData={editingCustomer || {}}
                        onSubmit={handleSubmit}
                        onCancel={handleFormCancel}
                    />
                </div>
            )}

            {loading ? (
                <div className="text-center py-4 text-gray-600">Loading...</div>
            ) : customers.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No customers found</div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                    Membership
                                </th>
                                <th className="px-6 py-3 border-b text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {customers.map((customer) => (
                                <tr key={customer._id} className="hover:bg-gray-500">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {customer.firstName} {customer.lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {customer.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {customer.contactNumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            customer.status === 'Diamond'
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getMembershipName(customer)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => handleEdit(customer)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(customer._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerList;
