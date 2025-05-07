import dotenv from 'dotenv';
import path from 'path';

const NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config({
    path: path.resolve(process.cwd(), `.env.${NODE_ENV}`)
});

export const ENV = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || '',
    NODE_ENV
};
