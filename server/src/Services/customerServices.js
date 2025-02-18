import Customer from '../Schema/customer.js';

export const getAllCustomers = async (req, res) => {
  try {
      const customers = await Customer.find()
          .populate('membershipId')
          .sort({ createdAt: -1 });
      res.json(customers);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        const savedCustomer = await customer.save();
        const populatedCustomer = await Customer.findById(savedCustomer._id).populate('membershipId');
        res.status(201).json(populatedCustomer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('membershipId');
        
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};