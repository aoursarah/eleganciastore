import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
// FIX 5: Import AuthRequest from types instead of middleware
import { AuthRequest, IAuthResponse } from '../types/index.js';

/**
 * Register a new user
 * @route POST /api/auth/register
 */
export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        error: 'MISSING_FIELDS',
      } as IAuthResponse);
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
        error: 'PASSWORD_MISMATCH',
      } as IAuthResponse);
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
        error: 'WEAK_PASSWORD',
      } as IAuthResponse);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
        error: 'USER_EXISTS',
      } as IAuthResponse);
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email } as any,
      (process.env.JWT_SECRET || 'your_secret_key') as any,
      { expiresIn: process.env.JWT_EXPIRE || '7d' } as any
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id?.toString() || '',
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    } as IAuthResponse);
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    } as IAuthResponse);
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        error: 'MISSING_CREDENTIALS',
      } as IAuthResponse);
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        error: 'INVALID_CREDENTIALS',
      } as IAuthResponse);
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        error: 'INVALID_CREDENTIALS',
      } as IAuthResponse);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email } as any,
      (process.env.JWT_SECRET || 'your_secret_key') as any,
      { expiresIn: process.env.JWT_EXPIRE || '7d' } as any
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id?.toString() || '',
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    } as IAuthResponse);
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message,
    } as IAuthResponse);
  }
};

/**
 * Get current user profile
 * @route GET /api/auth/me
 */
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
        error: 'NOT_AUTHENTICATED',
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: 'USER_NOT_FOUND',
      });
    }

    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: user,
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving profile',
      error: error.message,
    });
  }
};

/**
 * Update user profile
 * @route PUT /api/auth/profile
 */
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
        error: 'NOT_AUTHENTICATED',
      });
    }

    const { firstName, lastName, phone, address, city, state, zipCode, country } = req.body;

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (city) updateData.city = city;
    if (state) updateData.state = state;
    if (zipCode) updateData.zipCode = zipCode;
    if (country) updateData.country = country;

    const user = await User.findByIdAndUpdate(req.user.userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: 'USER_NOT_FOUND',
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    });
  }
};
