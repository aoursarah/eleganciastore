// Import Request type from Express
import { Request } from 'express';
import mongoose from 'mongoose';

// FIX 1: Export AuthRequest interface for proper typing in controllers
// This extends Express Request with custom user data embedded by JWT middleware
export interface AuthRequest extends Request {
  user?: IUserPayload;
}

// User Types
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserPayload {
  userId: string;
  email: string;
}

// Product Types
export interface IProduct {
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
  stock: number;
  rating: number;
  reviews: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Order Types
export interface IOrderItem {
  productId: mongoose.Types.ObjectId | string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
}

export interface IOrder {
  userId: mongoose.Types.ObjectId | string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  trackingNumber?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Auth Response Types
export interface IAuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

// API Response Types
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
