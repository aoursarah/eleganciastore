import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const orderStatuses = [
  { id: 'received', label: 'Order Received', icon: Package },
  { id: 'preparing', label: 'Preparing', icon: Clock },
  { id: 'shipping', label: 'Shipping', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle }
];

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { orders } = useStore();
  const orderIdParam = searchParams.get('orderId');

  const [trackingNumber, setTrackingNumber] = useState(orderIdParam || '');
  const [searchedOrder, setSearchedOrder] = useState(
    orderIdParam ? orders.find(o => o.id === orderIdParam) : null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const order = orders.find(o => o.id === trackingNumber);
    setSearchedOrder(order || null);
  };

  const getStatusIndex = (status: string) => {
    return orderStatuses.findIndex(s => s.id === status);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Track Your Order
          </h1>
          <p className="text-muted-foreground mb-8">
            Enter your order number to track your shipment
          </p>

          {/* Search Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSearch}
            className="mb-12"
          >
            <div className="flex gap-4">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter order number (e.g., ORD-1234567890)"
                className="flex-1 px-6 py-4 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                Track Order
              </button>
            </div>
          </motion.form>

          {searchedOrder ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Order Info */}
              <div className="bg-white rounded-2xl p-6 border border-border">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                      Order {searchedOrder.id}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(searchedOrder.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Total</p>
                    <p className="text-2xl">${searchedOrder.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-8">
                  <div className="flex justify-between items-start">
                    {orderStatuses.map((status, index) => {
                      const StatusIcon = status.icon;
                      const currentIndex = getStatusIndex(searchedOrder.status);
                      const isActive = index <= currentIndex;
                      const isCurrent = index === currentIndex;

                      return (
                        <div key={status.id} className="flex-1 relative">
                          <div className="flex flex-col items-center">
                            {/* Icon */}
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                                isActive
                                  ? isCurrent
                                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                                    : 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              <StatusIcon className="w-8 h-8" />
                            </motion.div>
                            
                            {/* Label */}
                            <p className={`text-sm text-center ${
                              isActive ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {status.label}
                            </p>
                          </div>

                          {/* Connector Line */}
                          {index < orderStatuses.length - 1 && (
                            <div className="absolute top-8 left-1/2 w-full h-0.5">
                              <div className={`h-full ${
                                index < currentIndex ? 'bg-primary' : 'bg-border'
                              }`} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Status Message */}
                <div className="bg-[#F8F8F8] rounded-xl p-4 text-center">
                  <p className="text-sm">
                    {searchedOrder.status === 'received' && 'Your order has been received and is being processed'}
                    {searchedOrder.status === 'preparing' && 'Your order is being carefully prepared for shipment'}
                    {searchedOrder.status === 'shipping' && 'Your order is on its way!'}
                    {searchedOrder.status === 'delivered' && 'Your order has been delivered. Enjoy your purchase!'}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-2xl p-6 border border-border">
                <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                  Order Items
                </h3>
                <div className="space-y-4">
                  {searchedOrder.items.map((item) => (
                    <div
                      key={item.cartId}
                      className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          {item.selectedColor} / {item.selectedSize}
                        </p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Help */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Need help with your order?
                </p>
                <Link to="/" className="text-sm text-primary hover:underline">
                  Contact Customer Support
                </Link>
              </div>
            </motion.div>
          ) : trackingNumber && !searchedOrder ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl mb-2">Order Not Found</h3>
              <p className="text-muted-foreground">
                We couldn't find an order with that number. Please check and try again.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl mb-2">Recent Orders</h3>
              {orders.length > 0 ? (
                <div className="max-w-md mx-auto mt-6 space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <button
                      key={order.id}
                      onClick={() => {
                        setTrackingNumber(order.id);
                        setSearchedOrder(order);
                      }}
                      className="w-full p-4 bg-white rounded-xl border border-border hover:border-primary transition-colors text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="mb-1">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <p>${order.total.toFixed(2)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  You don't have any recent orders.{' '}
                  <Link to="/shop" className="text-primary hover:underline">
                    Start shopping
                  </Link>
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};