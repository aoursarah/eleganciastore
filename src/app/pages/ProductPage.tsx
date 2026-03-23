import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Star, ShoppingBag, Heart, Minus, Plus, Truck, RotateCcw, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { toast } from 'sonner';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const product = products.find(p => p.id === id);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <Link to="/shop" className="text-primary hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    addToCart(product, selectedColor, selectedSize, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-foreground">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {[product.image, product.image, product.image, product.image].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-[3/4] rounded-xl overflow-hidden ${
                    activeImage === idx ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  {product.name}
                </h1>
                <p className="text-muted-foreground">{product.category}</p>
              </div>
              <button className="p-3 rounded-full hover:bg-muted transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'fill-current text-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl">${product.price}</p>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block mb-3">
                Color: {selectedColor && <span className="text-muted-foreground">{selectedColor}</span>}
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 border rounded-lg transition-all ${
                      selectedColor === color
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block mb-3">
                Size: {selectedSize && <span className="text-muted-foreground">{selectedSize}</span>}
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border rounded-lg transition-all ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-full hover:bg-muted transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                Buy Now
              </button>
            </div>

            {/* Benefits */}
            <div className="space-y-4 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-muted-foreground" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="w-5 h-5 text-muted-foreground" />
                <span>Free returns within 30 days</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span>1 year warranty</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="mb-4">Product Details</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="group">
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      ${relatedProduct.price}
                    </div>
                  </div>
                  <h3 className="mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span>{relatedProduct.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{relatedProduct.reviews} reviews</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
