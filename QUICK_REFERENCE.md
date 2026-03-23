# Quick Reference Guide

## 🚀 Project Status: COMPLETE ✅

Everything you need for a production-ready e-commerce application is ready.

---

## ⚡ Get Started in 2 Minutes

### Step 1: Install & Run Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
✓ Backend running on http://localhost:5000

### Step 2: Install & Run Frontend (new terminal)
```bash
npm install
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
npm run dev
```
✓ Frontend running on http://localhost:5173

### Step 3: Add Sample Data (new terminal - optional)
```bash
cd backend
npm run seed
```
✓ 10 products added to database

---

## 📚 Key Files

| File | Purpose |
|------|---------|
| `SETUP.md` | **START HERE** - Complete setup guide |
| `PROJECT_COMPLETION.md` | What was built & project summary |
| `README.md` | Project overview & features |
| `backend/API_DOCUMENTATION.md` | All API endpoints documented |
| `.env.example` | Frontend env template |
| `backend/.env.example` | Backend env template |

---

## 🔑 Key API Endpoints

### Authentication
```
POST   /api/auth/register      - Create account
POST   /api/auth/login         - Login
GET    /api/auth/me            - Get profile (🔒)
PUT    /api/auth/profile       - Update profile (🔒)
```

### Products
```
GET    /api/products           - List products
GET    /api/products/:id       - Get product
GET    /api/products/search/:q - Search
POST   /api/products           - Create (🔒 Admin)
PUT    /api/products/:id       - Update (🔒 Admin)
DELETE /api/products/:id       - Delete (🔒 Admin)
```

### Orders
```
GET    /api/orders             - List orders (🔒)
POST   /api/orders             - Create order (🔒)
GET    /api/orders/:id         - Get order (🔒)
POST   /api/orders/:id/cancel  - Cancel order (🔒)
PUT    /api/orders/:id/status  - Update status (🔒 Admin)
```

🔒 = Requires JWT token in header: `Authorization: Bearer <token>`

---

## 🔧 Important Files

### Backend
```
backend/src/
├── server.ts              # Express app
├── models/User.ts         # User schema
├── models/Product.ts      # Product schema
├── models/Order.ts        # Order schema
├── controllers/auth*      # Auth logic
├── controllers/product*   # Product logic
├── controllers/order*     # Order logic
├── routes/auth.ts         # Auth routes
├── routes/products.ts     # Product routes
├── routes/orders.ts       # Order routes
└── middleware/auth.ts     # JWT middleware
```

### Frontend
```
src/
├── services/api.ts        # API calls
├── app/context/AuthContext.tsx    # Auth state
├── app/pages/LoginPage.tsx        # Login
├── app/pages/RegisterPage.tsx     # Register
└── app/components/Header.tsx      # Updated with auth
```

---

## 🗄️ Database

### MongoDB Collections

**users**
```json
{
  "_id": ObjectId,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@test.com",
  "password": "<hashed>",
  "phone": "123-456-7890",
  "address": "123 Main St",
  "createdAt": Date
}
```

**products**
```json
{
  "_id": ObjectId,
  "name": "Silk Dress",
  "price": 189,
  "category": "Dresses",
  "image": "url",
  "colors": ["Black", "White"],
  "sizes": ["S", "M", "L"],
  "stock": 50
}
```

**orders**
```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "items": [
    {
      "productId": ObjectId,
      "name": "Silk Dress",
      "quantity": 2,
      "price": 189
    }
  ],
  "totalAmount": 378,
  "status": "delivered",
  "trackingNumber": "TRACK123..."
}
```

---

## 🔐 Authentication Flow

1. **Register**: POST `/api/auth/register`
   - Returns JWT token & user data
   - Token stored in localStorage

2. **Login**: POST `/api/auth/login`
   - Returns JWT token & user data
   - Token stored in localStorage

3. **Protected Requests**
   - Add header: `Authorization: Bearer <token>`
   - Backend verifies token validity

4. **Logout**
   - Clear localStorage
   - Delete token

---

## 🧪 Test the API with Postman

### 1. Register
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@test.com",
  "password": "Test123456",
  "confirmPassword": "Test123456"
}
```

### 2. Copy the token from response

### 3. Get Products
```
GET http://localhost:5000/api/products
```

### 4. Create Order (with token)
```
POST http://localhost:5000/api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [{
    "productId": "<id>",
    "name": "Silk Dress",
    "price": 189,
    "quantity": 1,
    "color": "Black",
    "size": "M"
  }],
  "totalAmount": 189,
  "shippingAddress": {...},
  "paymentMethod": "credit_card"
}
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't connect to MongoDB | Check connection string in `.env` |
| Port 5000 in use | `taskkill /PID <pid> /F` or change PORT in .env |
| Frontend can't reach API | Check `VITE_API_URL` in `.env.local` |
| JWT errors after logout | Clear localStorage in DevTools |
| Can't find products | Run `npm run seed` in backend |

See [SETUP.md](./SETUP.md) for more troubleshooting.

---

## 📋 Checklist

### Getting Started
- [ ] Read [SETUP.md](./SETUP.md)
- [ ] Set up MongoDB (local or Atlas)
- [ ] Clone/extract project
- [ ] Install backend dependencies
- [ ] Install frontend dependencies
- [ ] Create `.env` files
- [ ] Run backend server
- [ ] Run frontend server
- [ ] Run database seed
- [ ] Access http://localhost:5173

### Testing
- [ ] Register new account
- [ ] Login with credentials
- [ ] Browse products
- [ ] Search products
- [ ] Add to cart
- [ ] Proceed to checkout
- [ ] Place order
- [ ] View order history
- [ ] Verify responsive design

### Production Ready
- [ ] Test all API endpoints
- [ ] Verify authentication works
- [ ] Check error handling
- [ ] Review security
- [ ] Set production environment
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Configure payment (optional)

---

## 🚀 Deployment

### Backend (Heroku, Railway, Render)
1. Push to repository
2. Connect to deployment platform
3. Set `MONGODB_URI` and `JWT_SECRET` in environment
4. Auto-deploys on push

### Frontend (Vercel, Netlify)
1. Connect repository
2. Set `VITE_API_URL` to production backend URL
3. Auto-deploys on push

---

## 📚 Documentation Links

- [Full Setup Instructions](./SETUP.md)
- [API Documentation](./backend/API_DOCUMENTATION.md)
- [Project Overview](./README.md)
- [What Was Built](./PROJECT_COMPLETION.md)

---

## 💡 What's Included

✅ Working frontend (React + TypeScript)  
✅ Working backend (Express + Node.js)  
✅ MongoDB database integration  
✅ JWT authentication  
✅ User registration/login  
✅ Product CRUD operations  
✅ Shopping cart system  
✅ Order management  
✅ Order tracking  
✅ Responsive design  
✅ Error handling  
✅ Input validation  
✅ Sample data (10 products)  
✅ Complete documentation  
✅ Environment templates  
✅ Database seeding script  

---

## ❓ FAQ

**Q: How do I change the API URL?**
A: Edit `.env.local` in frontend root:
```env
VITE_API_URL=http://your-backend-url/api
```

**Q: How do I reset the database?**
A: MongoDB: Delete the database, then run `npm run seed`

**Q: Can I deploy just the backend?**
A: Yes! Deploy backend separately, then update frontend's `VITE_API_URL`

**Q: Is there an admin panel?**
A: Admin pages exist at `/admin` for managing orders and products

**Q: How long is the JWT token valid?**
A: 7 days by default (set in `JWT_EXPIRE` in backend `.env`)

**Q: Can I use this in production?**
A: Yes! Add payment gateway, implement email verification, and enable HTTPS

---

## 🎉 You're All Set!

Everything you need is ready. Start with [SETUP.md](./SETUP.md) and you'll be up and running in minutes!

**Happy coding!** 🚀
