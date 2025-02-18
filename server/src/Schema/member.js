import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Membership', membershipSchema);