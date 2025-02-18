// backend/scripts/seedMemberships.js
import mongoose from 'mongoose';
import Membership from './src/Schema/member.js';

const seedMemberships = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0/crud');
        
        const memberships = [
            { name: 'Basic Membership', description: 'Basic level membership' },
            { name: 'Premium Membership', description: 'Premium level membership' },
            { name: 'VIP Membership', description: 'VIP level membership' }
        ];

        await Membership.deleteMany({});
        await Membership.insertMany(memberships);
        
        console.log('Memberships seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding memberships:', error);
        process.exit(1);
    }
};

seedMemberships();