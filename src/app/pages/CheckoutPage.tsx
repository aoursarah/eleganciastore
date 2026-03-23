import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { toast } from 'sonner';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, placeOrder } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '', 
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (Object.values(formData).some(value => !value)) {
      toast.error('Please fill in all fields');
      return;
    }

    // Generate WhatsApp message
    const message = `New Order\n\n${cart.map(item => 
      `Product: ${item.name}\nSize: ${item.selectedSize}\nColor: ${item.selectedColor}\nQuantity: ${item.quantity}\n\n`
    ).join('')}Customer: ${formData.name}\nPhone: ${formData.phone}\nCity: ${formData.city}\nAddress: ${formData.address}`;

    const whatsappUrl = `https://wa.me/212694997271?text=${encodeURIComponent(message)}`;

    // Place order and redirect to WhatsApp
    const orderId = placeOrder(formData);
    toast.success('Order placed successfully! Redirecting to WhatsApp...');
    window.open(whatsappUrl, '_blank');
    navigate(`/order-tracking?orderId=${orderId}`);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
            {/* Delivery Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-border"
            >
              <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Delivery Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </motion.div>


            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-[#F8F8F8] rounded-2xl p-6">
                <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedColor} / {item.selectedSize}
                        </p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                >
                  Confirm Order
                </button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Payment will be collected upon delivery (Cash on Delivery)
                </p>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};