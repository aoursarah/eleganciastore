# 👨‍💻 Developer Guide

This guide explains the codebase architecture and how to maintain/extend the application.

---

## 📂 Codebase Overview

### Backend Architecture

```
backend/src/
├── server.ts                 # Express app initialization
├── config/
│   └── database.ts          # MongoDB connection logic
├── types/
│   └── index.ts             # TypeScript interfaces
├── middleware/
│   └── auth.ts              # JWT & error handling
├── models/
│   ├── User.ts
│   ├── Product.ts
│   └── Order.ts
├── controllers/
│   ├── authController.ts    # Register, login, profile
│   ├── productController.ts # CRUD, search
│   └── orderController.ts   # Order operations
└── routes/
    ├── auth.ts
    ├── products.ts
    └── orders.ts
```

### Frontend Architecture

```
src/
├── services/
│   └── api.ts               # Centralized API calls
├── app/
│   ├── context/
│   │   ├── AuthContext.tsx  # Auth state management
│   │   └── StoreContext.tsx # Store/cart state
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── ... (other pages)
│   ├── components/
│   │   ├── Header.tsx       # Main navigation
│   │   ├── Footer.tsx
│   │   └── ui/              # Reusable components
│   ├── layouts/
│   │   └── RootLayout.tsx   # Main layout wrapper
│   ├── App.tsx
│   └── routes.tsx
└── styles/
```

---

## 🔄 Data Flow

### Authentication Flow

```
User Input
    ↓
LoginPage/RegisterPage
    ↓
authAPI.login/register()
    ↓
POST /api/auth/login (backend)
    ↓
authController.login()
    ↓
User.findOne() → bcrypt.compare()
    ↓
Generate JWT
    ↓
Return token + user data
    ↓
Store in localStorage
    ↓
Update AuthContext
```

### Product Fetch Flow

```
ShopPage Component
    ↓
useEffect(() => {
  productAPI.getProducts(category)
})
    ↓
GET /api/products?category=Dresses
    ↓
productController.getProducts()
    ↓
Product.find()
    ↓
Return products array
    ↓
Update component state
    ↓
Render products
```

### Order Creation Flow

```
CheckoutPage
    ↓
Form submission
    ↓
orderAPI.createOrder(orderData)
    ↓
POST /api/orders (with JWT token)
    ↓
verifyToken middleware
    ↓
orderController.createOrder()
    ↓
Order.create()
    ↓
Generate trackingNumber
    ↓
Return order
    ↓
Redirect to success page
```

---

## 🔑 Key Components

### Backend

#### `src/middleware/auth.ts`
- **Purpose**: JWT verification and error handling
- **Key Functions**:
  - `verifyToken()` - Middleware to check JWT token
  - `errorHandler()` - Global error handling
- **Usage**: Applied to protected routes

#### `src/models/*.ts`
- **Mongoose Schemas**: Define database structure
- **Key Methods**:
  - `User.comparePassword()` - Compare hashed passwords
  - `User.pre('save')` - Password hashing before save
- **Indexes**: For performance optimization

#### `src/controllers/*.ts`
- **Business Logic**: Core application logic
- **Pattern**: Request validation → Database operation → Response
- **Error Handling**: Try/catch blocks with informative messages

#### `src/routes/*.ts`
- **Route Mapping**: Connect endpoints to controllers
- **Protection**: Apply middleware to protected routes
- **Documentation**: JSDoc comments for each endpoint

### Frontend

#### `src/services/api.ts`
- **Purpose**: Centralized API communication
- **Functions**: 
  - `apiCall()` - Helper with auth token injection
  - `authAPI`, `productAPI`, `orderAPI` - Endpoint groups
- **Usage**: Import and call from components

#### `src/app/context/AuthContext.tsx`
- **Purpose**: Global authentication state
- **Provides**:
  - `user` - Current user data
  - `token` - JWT token
  - `isAuthenticated` - Auth status
  - Methods: `login()`, `register()`, `logout()`, `updateProfile()`
- **Usage**: `const { user, login } = useAuth()`

#### `src/app/pages/*.tsx`
- **LoginPage**: User login form
- **RegisterPage**: User registration form
- **Other pages**: Already exist, use AuthContext & API

---

## 🛠 How to Add Features

### Add a New API Endpoint

**1. Create Database Model** (if needed)
```typescript
// backend/src/models/Review.ts
const reviewSchema = new Schema({
  productId: ObjectId,
  userId: ObjectId,
  rating: Number,
  comment: String
});
```

**2. Create Controller**
```typescript
// backend/src/controllers/reviewController.ts
export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    // Validation
    // Database operation
    // Response
  } catch (error) {
    // Error handling
  }
};
```

**3. Create Route**
```typescript
// backend/src/routes/reviews.ts
router.post('/', verifyToken, createReview);
router.get('/product/:id', getProductReviews);
```

**4. Add to Server**
```typescript
// backend/src/server.ts
app.use('/api/reviews', reviewRoutes);
```

**5. Add API Service**
```typescript
// src/services/api.ts
export const reviewAPI = {
  createReview: async (data) => {
    return apiCall('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
      requiresAuth: true
    });
  }
};
```

**6. Use in Component**
```typescript
// In React component
import { reviewAPI } from '@/services/api';

const { data } = await reviewAPI.createReview({
  productId, rating, comment
});
```

---

### Add a New Frontend Page

**1. Create Page Component**
```typescript
// src/app/pages/ReviewsPage.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { reviewAPI } from '@/services/api';

export const ReviewsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Component logic
  
  return (
    <div>
      {/* Page content */}
    </div>
  );
};
```

**2. Add Route**
```typescript
// src/app/routes.tsx
import { ReviewsPage } from './pages/ReviewsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      // ... existing routes
      { path: 'reviews', Component: ReviewsPage },
    ],
  },
]);
```

**3. Update Navigation**
```typescript
// src/app/components/Header.tsx
<Link to="/reviews">REVIEWS</Link>
```

---

## 🔒 Security Best Practices

### Password Security
- ✅ Hash passwords with bcryptjs (salt rounds: 10)
- ✅ Never return password in API responses
- ✅ Use `.select('+password')` only when needed
- ✅ Compare passwords with `comparePassword()` method

### JWT Security
- ✅ Sign JWT with `process.env.JWT_SECRET`
- ✅ Verify token on protected routes
- ✅ Set reasonable expiration (7d default)
- ✅ Store token in secure location (localStorage)

### API Security
- ✅ Validate all inputs
- ✅ Use CORS configuration
- ✅ Check authorization on protected routes
- ✅ Don't expose sensitive information
- ✅ Use try/catch for error handling

### Database Security
- ✅ Use environment variables for connection strings
- ✅ Create unique indexes on sensitive fields (email)
- ✅ Validate data with Mongoose schemas
- ✅ Use prepared queries (Mongoose protects by default)

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication**
- [ ] Register new user
- [ ] Login with correct credentials
- [ ] Login with wrong credentials (should fail)
- [ ] Access protected route without token (should fail)
- [ ] Logout and verify token removed

**Products**
- [ ] Get all products
- [ ] Filter by category
- [ ] Search products
- [ ] Get single product
- [ ] Pagination works

**Orders**
- [ ] Create order (must be logged in)
- [ ] Get order history
- [ ] Get single order
- [ ] Cancel order
- [ ] Order status updates

### API Testing with Postman

```
1. Import endpoints from API_DOCUMENTATION.md
2. Register user (save token)
3. Use token for protected endpoints
4. Test error scenarios
5. Verify response formats
```

---

## 🐛 Debugging

### Backend Debugging

**Enable Logging**
```typescript
// Add console.log statements
console.log('User:', user);
console.log('Order created:', order);

// Or use a logging library
import logger from './utils/logger';
logger.info('Order created', { orderId: order._id });
```

**Check MongoDB**
```bash
# Connect to MongoDB
mongosh "mongodb://localhost:27017/fashion-ecommerce"

# View collections
show collections

# Query documents
db.users.findOne({ email: "test@test.com" })
db.products.find({}).limit(5)
db.orders.findOne({ userId: ObjectId("...") })
```

**Check Network Requests**
```bash
# Terminal logs show request details
POST /api/auth/register
Response: 201 Created
```

### Frontend Debugging

**browser Console**
```javascript
// Check auth context
localStorage.getItem('authToken')
localStorage.getItem('authUser')

// Check network tab
// Look for API calls to http://localhost:5000/api/*
```

**React DevTools**
```
1. Install React DevTools extension
2. Inspect components
3. Check context values
4. Check component state
```

---

## 📈 Performance Optimization

### Database

**Add Indexes**
```typescript
// In schema
productSchema.index({ category: 1 });
userSchema.index({ email: 1 }, { unique: true });
orderSchema.index({ userId: 1, createdAt: -1 });
```

**Pagination**
```typescript
// Implemented in getProducts()
const skip = (pageNum - 1) * limitNum;
const products = await Product.find(filter)
  .skip(skip)
  .limit(limitNum);
```

### Frontend

**Lazy Load Pages**
```typescript
// React Router code splitting
const ShopPage = React.lazy(() => import('./pages/ShopPage'));
```

**Memoize Components**
```typescript
export const Header = React.memo(() => {
  // Component code
});
```

---

## 🚀 Deployment Checklist

### Before Deployment

**Backend**
- [ ] Update `.env` with production values
- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET`
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Test all API endpoints
- [ ] Check error handling
- [ ] Enable logging

**Frontend**
- [ ] Update `VITE_API_URL` to production backend
- [ ] Test all features
- [ ] Check responsive design
- [ ] Test on real mobile devices
- [ ] Optimize bundle size
- [ ] Test performance

### Deployment Steps

**Backend (Railway Example)**
```bash
1. Connect GitHub repository
2. Set environment variables
3. Deploy
4. Monitor logs
```

**Frontend (Vercel Example)**
```bash
1. Connect GitHub repository
2. Set build command: npm run build
3. Set output directory: dist
4. Set env variables
5. Deploy
```

---

## 📚 Resources

### Code References
- [Node.js Best Practices](https://nodejs.org/en/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [React Documentation](https://react.dev/)

### Architecture Patterns
- MVC (Models, Views, Controllers)
- REST API principles
- Context API for state management

### Learning Resources
- Backend folder structure in [PROJECT_COMPLETION.md](./PROJECT_COMPLETION.md)
- Frontend architecture in [PROJECT_COMPLETION.md](./PROJECT_COMPLETION.md)
- Full API reference in [backend/API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md)

---

## 🎯 Code Style

### Backend (TypeScript)
```typescript
// Use async/await
export const getUser = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

// Use type annotations
interface IUserData {
  email: string;
  password: string;
}

// Use consistent error handling
if (!user) {
  return res.status(404).json({
    success: false,
    message: 'User not found',
    error: 'USER_NOT_FOUND'
  });
}
```

### Frontend (React)
```typescript
// Use functional components
export const MyComponent: React.FC = () => {
  const { data, loading } = useData();
  
  if (loading) return <Loading />;
  
  return <div>{data}</div>;
};

// Use custom hooks
const { user, login } = useAuth();

// Use TypeScript types
interface IProps {
  title: string;
  onClick: (id: string) => void;
}
```

---

## 🔗 File Relationships

```
User Flow:
  LoginPage.tsx
  ↓
  API: authAPI.login()
  ↓
  Backend: /api/auth/login
  ↓
  authController.login()
  ↓
  User.findOne() + bcrypt.compare()
  ↓
  jwt.sign() → token
  ↓
  Response to frontend
  ↓
  AuthContext.tsx updates state
  ↓
  localStorage stores token
  ↓
  Header.tsx displays user name

Product Flow:
  ShopPage.tsx
  ↓
  API: productAPI.getProducts()
  ↓
  Backend: /api/products
  ↓
  productController.getProducts()
  ↓
  Product.find(filter)
  ↓
  Return products + pagination
  ↓
  Update component state
  ↓
  Render products
```

---

## 📞 Common Development Tasks

### Update a Database Schema
1. Edit file: `backend/src/models/*.ts`
2. Restart backend: `npm run dev`
3. For existing data, create migration script
4. Test with: `npm run seed`

### Add New Environment Variable
1. Add to `.env`:
   ```env
   NEW_VAR=value
   ```
2. Access in code:
   ```typescript
   const value = process.env.NEW_VAR;
   ```
3. Add to `.env.example` for documentation

### Create New API Route
See "Add a New API Endpoint" section above

### Debug API Error
1. Check terminal output for backend logs
2. Check browser Network tab
3. Check response status and message
4. Check MongoDB data with mongosh
5. Add console.log statements

---

## ✅ Checklist for Maintaining Code

- [ ] Keep dependencies updated
- [ ] Follow code style conventions
- [ ] Add JSDoc comments to functions
- [ ] Test changes thoroughly
- [ ] Update documentation
- [ ] Use meaningful variable names
- [ ] Handle errors properly
- [ ] Validate inputs
- [ ] Use environment variables for secrets
- [ ] Write secure code

---

**Happy coding!** 🚀

For questions, refer to:
- [SETUP.md](./SETUP.md) - Setup & troubleshooting
- [backend/API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md) - API reference
- [PROJECT_COMPLETION.md](./PROJECT_COMPLETION.md) - What was built
