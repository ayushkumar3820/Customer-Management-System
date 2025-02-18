import express from 'express';
import {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
} from '../Services/customerServices.js';

import {
    getAllMemberships,
    createMembership
} from '../Services/mermberServices.js';
const router = express.Router();

router.get('/', getAllCustomers);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);


router.get('/', getAllMemberships);
router.post('/', createMembership);

export default router;