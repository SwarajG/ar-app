import mongoose from 'mongoose';
import { envs } from './envs';

export const connect = async () => {
  await mongoose.connect(envs.mongoUrl || '');
};
