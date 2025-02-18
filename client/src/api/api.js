import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const getCustomers = async () => {
    try {
        const response = await api.get('/customers');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching customers');
    }
};

export const createCustomer = async (customerData) => {
    try {
        const response = await api.post('/customers', customerData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating customer');
    }
};

export const updateCustomer = async (id, customerData) => {
    try {
        const response = await api.put(`/customers/${id}`, customerData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating customer');
    }
};

export const deleteCustomer = async (id) => {
    try {
        await api.delete(`/customers/${id}`);
        return true;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting customer');
    }
};


export const getMemberships = async () => {
    try {
        const response = await api.get('/memberships');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching memberships');
    }
};