/**
 * Seed Database
 * Run this script to populate MongoDB with sample products
 * 
 * Run with: npx ts-node --esm scripts/seed.ts
 * Or add as npm script and run: npm run seed
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../src/models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fashion-ecommerce';

const sampleProducts = [
  {
    name: 'Silk Slip Dress',
    price: 189,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1678723357379-d87f2a0ec8ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwd29tYW4lMjBlbGVnYW50fGVufDF8fHx8MTc3MjgwOTE0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Elegant silk slip dress perfect for evening occasions',
    colors: ['Black', 'White', 'Champagne'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 50,
    rating: 4.8,
    reviews: 24,
  },
  {
    name: 'Tailored Blazer',
    price: 249,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Professional tailored blazer in premium wool',
    colors: ['Navy', 'Black', 'Charcoal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 35,
    rating: 4.7,
    reviews: 18,
  },
  {
    name: 'Leather Handbag',
    price: 329,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Luxurious Italian leather handbag',
    colors: ['Black', 'Brown', 'Burgundy', 'Tan'],
    sizes: ['One Size'],
    stock: 25,
    rating: 4.9,
    reviews: 32,
  },
  {
    name: 'High-Waisted Jeans',
    price: 149,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Classic high-waisted denim jeans with perfect fit',
    colors: ['Dark Blue', 'Light Blue', 'Black'],
    sizes: ['24', '25', '26', '27', '28', '29', '30', '31', '32'],
    stock: 80,
    rating: 4.6,
    reviews: 41,
  },
  {
    name: 'Silk Blouse',
    price: 179,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1622333663912-e6fda63dc470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Luxurious silk blouse for a sophisticated look',
    colors: ['Cream', 'White', 'Blush', 'Sage'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 45,
    rating: 4.7,
    reviews: 19,
  },
  {
    name: 'Designer Heels',
    price: 289,
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Elegant designer heels for any occasion',
    colors: ['Black', 'Gold', 'Silver'],
    sizes: ['5', '6', '7', '8', '9', '10', '11'],
    stock: 30,
    rating: 4.8,
    reviews: 27,
  },
  {
    name: 'Midi Skirt',
    price: 139,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1583275335684-82a41c9a92dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Elegant midi skirt with flowing fabric',
    colors: ['Navy', 'Black', 'Emerald'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 55,
    rating: 4.5,
    reviews: 22,
  },
  {
    name: 'Evening Gown',
    price: 399,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595839686998-b8e96ad488b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Stunning evening gown for special occasions',
    colors: ['Black', 'Red', 'Sapphire'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 20,
    rating: 4.9,
    reviews: 15,
  },
  {
    name: 'Cashmere Sweater',
    price: 279,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Premium cashmere sweater for ultimate comfort',
    colors: ['Cream', 'Gray', 'Burgundy', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 40,
    rating: 4.8,
    reviews: 28,
  },
  {
    name: 'Gold Necklace',
    price: 199,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Elegant 14K gold necklace with pendant',
    colors: ['Gold', 'Rose Gold', 'White Gold'],
    sizes: ['One Size'],
    stock: 60,
    rating: 4.7,
    reviews: 20,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully inserted ${insertedProducts.length} products`);

    // Display summary
    console.log('\n📦 Sample Products Added:');
    sampleProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price}`);
    });

    console.log('\n✅ Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();
