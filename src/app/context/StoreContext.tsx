import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  cartId: string; // Unique identifier for this cart item
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'received' | 'preparing' | 'shipping' | 'delivered';
  items: CartItem[];
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product, color: string, size: string, quantity: number) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (orderDetails: any) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Silk Slip Dress',
    price: 189,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1678723357379-d87f2a0ec8ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwd29tYW4lMjBlbGVnYW50fGVufDF8fHx8MTc3MjgwOTE0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Elegant silk slip dress with delicate straps',
    colors: ['Beige', 'Black', 'White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Linen Midi Dress',
    price: 159,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1615453590051-9cc24146d6ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBkcmVzcyUyMGJlaWdlfGVufDF8fHx8MTc3MjgwOTE0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Breathable linen midi dress perfect for summer',
    colors: ['Beige', 'Pink', 'White'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.6,
    reviews: 98
  },
  {
    id: '3',
    name: 'Cashmere Sweater',
    price: 229,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1675294292199-aac27f952585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBmYXNoaW9uJTIwcGlua3xlbnwxfHx8fDE3NzI4MDkxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Luxurious cashmere sweater in soft pink',
    colors: ['Pink', 'Beige', 'Gray', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 156
  },
  {
    id: '4',
    name: 'Tailored Blazer',
    price: 299,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1767334010488-83cdb8539273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGNsb3RoaW5nfGVufDF8fHx8MTc3MjgwOTE0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Classic tailored blazer with modern cut',
    colors: ['Black', 'Beige', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 89
  },
  {
    id: '5',
    name: 'Gold Chain Necklace',
    price: 89,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1769240171986-d4ba22cf3154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBlbGVnYW50fGVufDF8fHx8MTc3Mjc4MTQ5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Delicate gold-plated chain necklace',
    colors: ['Gold', 'Silver', 'Rose Gold'],
    sizes: ['One Size'],
    rating: 4.8,
    reviews: 201
  },
  {
    id: '6',
    name: 'Pleated Midi Skirt',
    price: 139,
    category: 'Sets',
    image: 'https://images.unsplash.com/photo-1691316089197-1269faeb3af7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGVsZWdhbnQlMjB3aGl0ZSUyMGRyZXNzfGVufDF8fHx8MTc3MjgwOTE1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Elegant pleated midi skirt',
    colors: ['White', 'Black', 'Beige'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.5,
    reviews: 67
  },
  {
    id: '7',
    name: 'Oversized Shirt',
    price: 119,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1643758344142-7933a8c07796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYnJhbmQlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzcyODA5MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Relaxed fit oversized cotton shirt',
    colors: ['White', 'Beige', 'Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviews: 112
  },
  {
    id: '8',
    name: 'Leather Handbag',
    price: 349,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1683290845409-280ec0dc39df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwYm91dGlxdWV8ZW58MXx8fHwxNzcyNzQ1OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Premium leather handbag with gold hardware',
    colors: ['Black', 'Tan', 'Brown'],
    sizes: ['One Size'],
    rating: 4.9,
    reviews: 178
  }
];

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Product, color: string, size: string, quantity: number) => {
    setCart(prev => {
      const cartId = `${product.id}-${color}-${size}`;
      const existingItem = prev.find(item => item.cartId === cartId);

      if (existingItem) {
        return prev.map(item =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { 
        ...product, 
        quantity, 
        selectedColor: color, 
        selectedSize: size,
        cartId 
      }];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (orderDetails: any): string => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'received',
      items: [...cart]
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder.id;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};