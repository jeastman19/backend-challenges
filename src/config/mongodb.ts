import { loadEnvFile } from 'node:process';
import mongoose from 'mongoose';

loadEnvFile();

const MONGO_URI = String(process.env.DB_URL);


export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    } catch (err) {
        console.error('Error disconnecting from MongoDB:', err);
    }
};
