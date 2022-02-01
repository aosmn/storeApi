import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export const generateToken = (user: User) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET!);  
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);    
    return decoded;
  } catch (error) {
    throw new Error(`Invalid Token! Error: ${error}`);
  }
};
