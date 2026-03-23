import { Response } from 'express';
import { Order } from '../models/Order.js';
// FIX 5: Import AuthRequest from types instead of middleware
import { AuthRequest } from '../types/index.js';

/**
 * Get all orders for the authenticated user
 * @route GET /api/orders
 */
export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
        error: 'NOT_AUTHENTICATED',
      });
    }

    const orders = await Order.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .populate('items.productId', 'name price image');

    res.json({
      success: true,
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error: any) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving orders',
      error: error.message,
    });
  }
};

/**
 * Get order by ID
 * @route GET /api/orders/:id
 */
export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
        error: 'NOT_AUTHENTICATED',
      });
    }

    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      userId: req.user.userId,
    }).populate('items.productId', 'name price image');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        error: 'ORDER_NOT_FOUND',
      });
    }

    res.json({
      success: true,
      message: 'Order retrieved successfully',
      data: order,
    });
  } catch (error: any) {
    console.error('Get order by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving order',
      error: error.message,
    });
  }
};

/**
 * Create a new order
 * @route POST /api/orders
 */
export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
        error: 'NOT_AUTHENTICATED',
      });
    }

    const { items, totalAmount, shippingAddress, paymentMethod, paymentStatus } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item',
        error: 'EMPTY_ORDER',
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Total amount must be greater than 0',
        error: 'INVALID_AMOUNT',
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required',
        error: 'MISSING_ADDRESS',
      });
    }

    // Create order
    const order = new Order({
      userId: req.user.userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'credit_card',
      paymentStatus: paymentStatus || 'pending',
      status: 'pending',
    });

    await order.save();

    // Generate tracking number (in production, integrate with shipping service)
    const trackingNumber = `TRACK${Date.now()}${req.user.userId}`;
    order.trackingNumber = trackingNumber;
    order.status = 'confirmed';
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message,
    });
  }
};

/**
 * Update order status (Admin only)
 * @route PUT /api/orders/:id/status
 */
export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
        error: 'MISSING_STATUS',
      });
    }

    const validStatuses = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
        error: 'INVALID_STATUS',
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        error: 'ORDER_NOT_FOUND',
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order,
    });
  } catch (error: any) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order',
      error: error.message,
    });
  }
};

/**
 * Cancel order
 * @route POST /api/orders/:id/cancel
 */
export const cancelOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
        error: 'NOT_AUTHENTICATED',
      });
    }

    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      userId: req.user.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        error: 'ORDER_NOT_FOUND',
      });
    }

    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order with status: ${order.status}`,
        error: 'CANNOT_CANCEL_ORDER',
      });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order,
    });
  } catch (error: any) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling order',
      error: error.message,
    });
  }
};
