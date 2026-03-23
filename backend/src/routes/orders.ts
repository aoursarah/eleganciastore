import express from 'express';
import {
  getUserOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/orderController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/orders
 * Get all orders for authenticated user (Protected)
 */
router.get('/', verifyToken, getUserOrders);

/**
 * GET /api/orders/:id
 * Get specific order by ID (Protected)
 */
router.get('/:id', verifyToken, getOrderById);

/**
 * POST /api/orders
 * Create a new order (Protected)
 */
router.post('/', verifyToken, createOrder);

/**
 * PUT /api/orders/:id/status
 * Update order status (Admin only)
 */
router.put('/:id/status', verifyToken, updateOrderStatus);

/**
 * POST /api/orders/:id/cancel
 * Cancel order (Protected)
 */
router.post('/:id/cancel', verifyToken, cancelOrder);

export default router;
