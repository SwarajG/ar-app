import { config } from 'dotenv';

config();

export const envs = {
  mongoUrl: process.env.MONGO_URL
};
