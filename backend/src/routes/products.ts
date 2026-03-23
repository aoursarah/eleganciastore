import express from 'express';
import {
  getProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

/**
 * GET /api/products
 * Get all products with optional filtering and pagination
 */
router.get('/', getProducts);

/**
 * GET /api/products/search/:query
 * Search products by name or description
 */
router.get('/search/:query', searchProducts);

/**
 * GET /api/products/:id
 * Get single product by ID
 */
router.get('/:id', getProductById);

/**
 * POST /api/products
 * Create a new product (Admin only)
 */
router.post('/', createProduct);

/**
 * PUT /api/products/:id
 * Update product (Admin only)
 */
router.put('/:id', updateProduct);

/**
 * DELETE /api/products/:id
 * Delete product (Admin only)
 */
router.delete('/:id', deleteProduct);

export default router;
