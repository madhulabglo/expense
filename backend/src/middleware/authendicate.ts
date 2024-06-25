import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_CODE || 'jhjherwe945845954jhglsitueoiriuew';

export interface AuthenticatedRequest extends Request {
  user?: { userId: string; email: string };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
