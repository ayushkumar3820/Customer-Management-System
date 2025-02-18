import Membership from '../Schema/member.js';

export const getAllMemberships = async (req, res) => {
    try {
        const memberships = await Membership.find();
        res.json(memberships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createMembership = async (req, res) => {
    try {
        const membership = new Membership(req.body);
        const savedMembership = await membership.save();
        res.status(201).json(savedMembership);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};