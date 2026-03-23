import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from '../types/index.js';

interface IProductDocument extends IProduct, Document {}

const productSchema = new Schema<IProductDocument>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories', 'Shoes'],
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    colors: {
      type: [String],
      required: [true, 'Product colors are required'],
      default: [],
    },
    sizes: {
      type: [String],
      required: [true, 'Product sizes are required'],
      default: [],
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: 0,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<IProductDocument>('Product', productSchema);
