import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Bell,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

type Tab = 'overview' | 'products' | 'orders' | 'customers';

export const AdminDashboard: React.FC = () => {
  const { products, orders } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const stats = [
    { label: 'Total Revenue', value: '$48,574', change: '+12.5%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Total Orders', value: orders.length.toString(), change: '+8.2%', icon: ShoppingCart, color: 'text-blue-600' },
    { label: 'Products', value: products.length.toString(), change: '+3', icon: Package, color: 'text-purple-600' },
    { label: 'Customers', value: '1,243', change: '+5.1%', icon: Users, color: 'text-orange-600' }
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F8F8F8] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 bg-white rounded-full hover:bg-muted transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 border-b border-border">
            {(['overview', 'products', 'orders', 'customers'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 border border-border"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm text-green-600">{stat.change}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl">{stat.value}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>
                  Recent Orders
                </h2>
                <button className="text-sm text-primary hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm text-muted-foreground">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm text-muted-foreground">Total</th>
                      <th className="text-left py-3 px-4 text-sm text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border last:border-0">
                        <td className="py-4 px-4">{order.id}</td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 rounded-full text-xs bg-[#F5EDE4] text-foreground capitalize">
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">${order.total.toFixed(2)}</td>
                        <td className="py-4 px-4">
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Add Product
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-4 border border-border"
                >
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-4">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg">${product.price}</p>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>
                All Orders
              </h2>
              <div className="flex gap-4">
                <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                  <option>All Status</option>
                  <option>Received</option>
                  <option>Preparing</option>
                  <option>Shipping</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Items</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Total</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="py-4 px-4">{order.id}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm">Customer #{order.id.slice(-4)}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-[#F5EDE4] text-foreground capitalize">
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm">{order.items.length}</td>
                      <td className="py-4 px-4">${order.total.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>
                Customer List
              </h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="pl-12 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Orders</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Total Spent</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Join Date</th>
                    <th className="text-left py-3 px-4 text-sm text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#F5EDE4] flex items-center justify-center">
                            C{i}
                          </div>
                          <span>Customer {i}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        customer{i}@example.com
                      </td>
                      <td className="py-4 px-4 text-sm">{Math.floor(Math.random() * 10) + 1}</td>
                      <td className="py-4 px-4">${(Math.random() * 1000 + 100).toFixed(2)}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
