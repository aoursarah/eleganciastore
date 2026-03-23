import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/auth.js';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: 'NOT_FOUND',
  });
});

// Error handler middleware
app.use(errorHandler);

// Database connection and server startup
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`\n✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ Frontend expected at: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log(`\n📚 API Routes:`);
      console.log(`   POST   /api/auth/register`);
      console.log(`   POST   /api/auth/login`);
      console.log(`   GET    /api/auth/me (Protected)`);
      console.log(`   PUT    /api/auth/profile (Protected)`);
      console.log(`   GET    /api/products`);
      console.log(`   GET    /api/products/:id`);
      console.log(`   GET    /api/products/search/:query`);
      console.log(`   POST   /api/products`);
      console.log(`   PUT    /api/products/:id`);
      console.log(`   DELETE /api/products/:id`);
      console.log(`   GET    /api/orders (Protected)`);
      console.log(`   GET    /api/orders/:id (Protected)`);
      console.log(`   POST   /api/orders (Protected)`);
      console.log(`   POST   /api/orders/:id/cancel (Protected)\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
