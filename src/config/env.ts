import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Config {
  NODE_ENV: string;
  PORT: number;
  MONGODB_URI: string;
  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
  REDIS_URL?: string;
}

export const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '4000', 10),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/lms',
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || '',
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || '',
  REDIS_URL: process.env.REDIS_URL,
}; 
