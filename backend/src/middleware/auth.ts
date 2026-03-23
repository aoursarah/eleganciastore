import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUserPayload, AuthRequest } from '../types/index.js';

/**
 * FIX 2: Middleware to verify JWT token from request headers
 * Properly typed with AuthRequest from types/index.ts
 * Expects token in Authorization header: Bearer <token>
 */
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    // FIX: Added proper type casting for authorization header
    const token = (req.headers.authorization as string)?.split(' ')[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'No token provided. Please log in.',
        error: 'MISSING_TOKEN',
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key') as IUserPayload;
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: 'Token has expired. Please log in again.',
        error: 'TOKEN_EXPIRED',
      });
      return;
    }

    res.status(403).json({
      success: false,
      message: 'Invalid token. Please log in again.',
      error: 'INVALID_TOKEN',
    });
  }
};

/**
 * FIX: Middleware to handle CORS and common errors
 * Properly typed return values
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      error: err.message,
    });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      message: 'Invalid ID format',
      error: err.message,
    });
    return;
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: err.error || 'SERVER_ERROR',
  });
};
