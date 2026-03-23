import React from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-muted-foreground" />
          <h2 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Your Cart is Empty
          </h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.cartId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 p-6 bg-white rounded-2xl border border-border"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.id}`}
                  className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-muted"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="mb-2 hover:text-muted-foreground transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.selectedColor} / {item.selectedSize}
                  </p>
                  <p className="text-lg mb-4">${item.price}</p>

                  <div className="flex items-center justify-between">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 min-w-[3rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Total for this item */}
                <div className="text-right">
                  <p className="text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-[#F8F8F8] rounded-2xl p-6">
              <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 100 && (
                  <p className="text-sm text-muted-foreground">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="flex justify-between mb-6 text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};