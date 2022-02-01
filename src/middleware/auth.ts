import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../helpers/auth';

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    if (token) {
      verifyToken(token);
      next();
    } else {
      res.status(401);
    }
  } catch (error) {
    res.status(401);
  }
};
