/**
 * API Service
 * Centralized API calls to the backend
 * 
 * FIX 4: Properly access Vite environment variables and type headers
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// FIX: Properly type headers to avoid TypeScript errors
interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

// Helper function to make API requests with auth headers
const apiCall = async (
  endpoint: string,
  options: RequestOptions = {}
) => {
  const { requiresAuth = true, ...fetchOptions } = options;

  // FIX: Properly initialize headers with correct typing
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (requiresAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

// ========== AUTH API CALLS ==========

export const authAPI = {
  /**
   * Register a new user
   */
  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      requiresAuth: false,
    });
  },

  /**
   * Login user
   */
  login: async (credentials: { email: string; password: string }) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      requiresAuth: false,
    });
  },

  /**
   * Get current user profile
   */
  getProfile: async () => {
    return apiCall('/auth/me', {
      method: 'GET',
      requiresAuth: true,
    });
  },

  /**
   * Update user profile
   */
  updateProfile: async (profileData: Record<string, any>) => {
    return apiCall('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
      requiresAuth: true,
    });
  },
};

// ========== PRODUCT API CALLS ==========

export const productAPI = {
  /**
   * Get all products with optional filtering
   */
  getProducts: async (category?: string, page: number = 1, limit: number = 12) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    return apiCall(`/products?${params.toString()}`, {
      method: 'GET',
      requiresAuth: false,
    });
  },

  /**
   * Get single product by ID
   */
  getProductById: async (id: string) => {
    return apiCall(`/products/${id}`, {
      method: 'GET',
      requiresAuth: false,
    });
  },

  /**
   * Search products by query
   */
  searchProducts: async (query: string) => {
    return apiCall(`/products/search/${encodeURIComponent(query)}`, {
      method: 'GET',
      requiresAuth: false,
    });
  },

  /**
   * Create product (Admin only)
   */
  createProduct: async (productData: Record<string, any>) => {
    return apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
      requiresAuth: true,
    });
  },

  /**
   * Update product (Admin only)
   */
  updateProduct: async (id: string, productData: Record<string, any>) => {
    return apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
      requiresAuth: true,
    });
  },

  /**
   * Delete product (Admin only)
   */
  deleteProduct: async (id: string) => {
    return apiCall(`/products/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },
};

// ========== ORDER API CALLS ==========

export const orderAPI = {
  /**
   * Get all orders for current user
   */
  getUserOrders: async () => {
    return apiCall('/orders', {
      method: 'GET',
      requiresAuth: true,
    });
  },

  /**
   * Get order by ID
   */
  getOrderById: async (id: string) => {
    return apiCall(`/orders/${id}`, {
      method: 'GET',
      requiresAuth: true,
    });
  },

  /**
   * Create new order
   */
  createOrder: async (orderData: Record<string, any>) => {
    return apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
      requiresAuth: true,
    });
  },

  /**
   * Update order status (Admin only)
   */
  updateOrderStatus: async (id: string, status: string) => {
    return apiCall(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
      requiresAuth: true,
    });
  },

  /**
   * Cancel order
   */
  cancelOrder: async (id: string) => {
    return apiCall(`/orders/${id}/cancel`, {
      method: 'POST',
      requiresAuth: true,
    });
  },
};
