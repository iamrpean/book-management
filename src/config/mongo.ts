import mongoose from 'mongoose';
import { ENV } from './env';

export const connectMongo = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URL);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
