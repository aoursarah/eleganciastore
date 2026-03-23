import { Response } from 'express';
import { Product } from '../models/Product.js';
// FIX 5: Import AuthRequest from types instead of middleware
import { AuthRequest } from '../types/index.js';

/**
 * Get all products with optional filtering
 * @route GET /api/products
 */
export const getProducts = async (req: AuthRequest, res: Response) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;

    // Build filter object
    const filter: any = {};
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Calculate pagination
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 12;
    const skip = (pageNum - 1) * limitNum;

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    // Get products
    const products = await Product.find(filter).skip(skip).limit(limitNum).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error: any) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving products',
      error: error.message,
    });
  }
};

/**
 * Get single product by ID
 * @route GET /api/products/:id
 */
export const getProductById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        error: 'PRODUCT_NOT_FOUND',
      });
    }

    res.json({
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error: any) {
    console.error('Get product by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving product',
      error: error.message,
    });
  }
};

/**
 * Search products by name
 * @route GET /api/products/search/:query
 */
export const searchProducts = async (req: AuthRequest, res: Response) => {
  try {
    const { query } = req.params;

    if (!query || query.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters',
        error: 'INVALID_SEARCH_QUERY',
      });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    }).limit(20);

    res.json({
      success: true,
      message: 'Search results retrieved successfully',
      data: products,
    });
  } catch (error: any) {
    console.error('Search products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching products',
      error: error.message,
    });
  }
};

/**
 * Create a new product (Admin only - add admin check in production)
 * @route POST /api/products
 */
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, price, category, image, description, colors, sizes, stock } = req.body;

    // Validation
    if (!name || !price || !category || !image || !description || !colors || !sizes) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: 'MISSING_FIELDS',
      });
    }

    const product = new Product({
      name,
      price,
      category,
      image,
      description,
      colors,
      sizes,
      stock: stock || 0,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error: any) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message,
    });
  }
};

/**
 * Update product (Admin only)
 * @route PUT /api/products/:id
 */
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        error: 'PRODUCT_NOT_FOUND',
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error: any) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message,
    });
  }
};

/**
 * Delete product (Admin only)
 * @route DELETE /api/products/:id
 */
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        error: 'PRODUCT_NOT_FOUND',
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message,
    });
  }
};
