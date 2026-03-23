
  # Premium Fashion E-Commerce Application

A full-stack e-commerce web application built with React, Express, MongoDB, and TypeScript.

## 🎯 Project Overview

This project demonstrates a complete, production-ready e-commerce platform with:
- **Frontend**: React + TypeScript + Tailwind CSS with responsive design
- **Backend**: Express.js REST API with Node.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT-based user authentication
- **Features**: User registration/login, product catalog, shopping cart, order management

## 📁 Project Structure

```
.
├── src/                         # React frontend (Vite + TypeScript)
│   ├── app/
│   │   ├── components/          # Reusable React components
│   │   ├── context/             # Context API providers (Auth, Store)
│   │   ├── pages/               # Page components
│   │   ├── layouts/             # Layout components
│   │   ├── App.tsx              # Main App component
│   │   └── routes.tsx           # Route definitions
│   ├── services/                # API service layer
│   └── styles/                  # Global styles
├── backend/                     # Node.js + Express backend
│   ├── src/
│   │   ├── models/              # MongoDB schemas
│   │   ├── controllers/         # Business logic
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Custom middleware
│   │   ├── config/              # Configuration
│   │   ├── types/               # TypeScript types
│   │   └── server.ts            # Express app entry point
│   ├── tsconfig.json
│   ├── package.json
│   └── .env.example
├── SETUP.md                     # Detailed setup instructions
├── package.json                 # Frontend package config
├── vite.config.ts              # Vite configuration
└── README.md                    # This file
```

## 🚀 Quick Start

### 1. Install MongoDB

- **Cloud**: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended)
- **Local**: Install [MongoDB Community](https://www.mongodb.com/try/download/community)

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret
npm run dev
```

### 3. Frontend Setup (New Terminal)

```bash
npm install
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
npm run dev
```

### 4. Seed Database (New Terminal)

```bash
cd backend
npx ts-node --esm scripts/seed.ts
```

**Access the app at**: http://localhost:5173

👉 **For detailed setup instructions, see [SETUP.md](./SETUP.md)**

## 📚 API Documentation

See [backend/API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md) for complete API reference.

### Key Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

**Products**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search/:query` - Search products

**Orders** (Protected)
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `POST /api/orders/:id/cancel` - Cancel order

## 🔓 Authentication

1. Users register with email/password
2. Password is hashed with bcryptjs
3. JWT token is issued and stored in localStorage
4. Protected routes check token validity

## 💾 Database Schema

**User**: firstName, lastName, email, password (hashed), phone, address, etc.

**Product**: name, price, category, image, description, colors, sizes, stock, rating

**Order**: userId, items, totalAmount, status, shippingAddress, paymentInfo, trackingNumber

## 🛠 Development

**Frontend Commands**
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

**Backend Commands**
```bash
cd backend
npm run dev      # Start dev server with hot reload
npm run build    # TypeScript build
npm start        # Run production build
```

## 🔒 Security Features

✅ Password hashing (bcryptjs)  
✅ JWT authentication  
✅ Protected API routes  
✅ CORS configuration  
✅ Input validation  
✅ Error handling  

## 📝 Features

**User Features**
- ✅ Registration/Login/Logout
- ✅ Profile management
- ✅ Browse products
- ✅ Search products
- ✅ Add to cart
- ✅ Place orders
- ✅ Track orders
- ✅ Order history

**Admin Features**
- ✅ Product management (CRUD)
- ✅ View all orders
- ✅ Update order status

## 🔧 Environment Variables

**Frontend** (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend** (.env)
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 📦 Key Dependencies

**Frontend**
- React, React Router, TypeScript
- Tailwind CSS
- Radix UI components
- Motion (animations)

**Backend**
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- CORS

## 🚀 Deployment

### Deploy Backend
- Platforms: Heroku, Railway, Render, AWS, Google Cloud
- Set environment variables
- Connect repository (auto-deploy on push)

### Deploy Frontend
- Platforms: Vercel, Netlify, AWS Amplify
- Run `npm run build`
- Update `VITE_API_URL` to production backend URL

## 📞 Troubleshooting

**MongoDB Connection Failed**
- Check connection string
- Verify IP whitelist (for Atlas)
- Ensure MongoDB is running

**Frontend Can't Connect**
- Check backend is running at http://localhost:5000
- Verify `VITE_API_URL` in .env.local
- Check browser console for errors

**Port Already in Use**
- Change PORT in backend .env
- Or kill existing process on that port

See [SETUP.md](./SETUP.md) for detailed troubleshooting.

## 📄 License

ISC

## 🤝 Contributing

Contributions welcome! Feel free to submit PRs or open issues.

---

**Need help?** Check [SETUP.md](./SETUP.md) for detailed instructions!  
**Happy coding!** 🎉

  This is a code bundle for Premium Fashion E-Commerce UI. The original project is available at https://www.figma.com/design/JZ8X8ILn4Br8Hmh3KSfao8/Premium-Fashion-E-Commerce-UI.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  