# Setup Instructions for Premium Fashion E-Commerce

Follow these step-by-step instructions to get the complete application running on your local machine.

## Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (local or cloud account)
  - Local: [Install MongoDB Community](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended for beginners)

### Verify Installation

```bash
node --version    # Should be v16+
npm --version     # Should work
```

---

## Step 1: Database Setup

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster
4. Create a database user with username and password
5. Add your IP to the whitelist (or use 0.0.0.0/0 for development)
6. Click "Connect" and select "Drivers"
7. Copy the connection string (it will look like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/fashion-ecommerce?retryWrites=true&w=majority
   ```

### Option B: MongoDB Local

1. Install MongoDB Community on your machine
2. Start MongoDB service:
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Windows
   mongod
   ```

3. Connection string:
   ```
   mongodb://localhost:27017/fashion-ecommerce
   ```

---

## Step 2: Backend Setup

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
# On Windows (PowerShell):
Copy-Item .env.example .env

# On macOS/Linux:
cp .env.example .env

# 4. Edit .env with your values
# Open .env in a text editor and update:
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# 5. Start the backend server
npm run dev
```

You should see output like:
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
```

Leave this terminal running!

---

## Step 3: Frontend Setup

Open a **new terminal** window:

```bash
# 1. Navigate to root directory
cd ..

# 2. Install dependencies
npm install

# 3. Create .env.local file
# On Windows (PowerShell):
"VITE_API_URL=http://localhost:5000/api" | Out-File .env.local

# On macOS/Linux:
echo "VITE_API_URL=http://localhost:5000/api" > .env.local

# 4. Start the frontend development server
npm run dev
```

You should see output like:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

## Step 4: Populate Sample Data

Open another **new terminal** window:

```bash
# Navigate to backend
cd backend

# Run seed script to add sample products
npx ts-node --esm scripts/seed.ts
```

Output should show:
```
Connected to MongoDB
Cleared existing products
Successfully inserted 10 products

📦 Sample Products Added:
1. Silk Slip Dress - $189
2. Tailored Blazer - $249
...

✅ Database seeded successfully!
```

---

## Step 5: Access the Application

Now you can access the application:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/health

---

## Testing the Application

### 1. Register a New User

Click the user icon or go to `/register`:
- Fill in: First Name, Last Name, Email, Password
- Click "Create Account"
- You'll be logged in automatically

### 2. Browse Products

- Go to "SHOP" page
- Browse all products
- Filter by category if desired
- Click on any product to see details

### 3. Add to Cart & Checkout

- Click "Add to Cart" on any product
- Go to cart page
- Proceed to checkout
- Fill in shipping address
- Place order

### 4. View Orders

- Click on your profile (user icon)
- View your order history
- Click on any order to see details with tracking number

---

## 🔧 Troubleshooting

### Issue: MongoDB Connection Error

**Error**: `MongooseError: Cannot connect to MongoDB`

**Solution**:
1. Check your connection string in `.env`
2. Verify MongoDB is running
3. For Atlas: Check IP whitelist and credentials
4. Check firewall rules

```bash
# Test connection manually
mongosh "mongodb://localhost:27017"
```

### Issue: Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

Or change PORT in `.env` (e.g., PORT=5001)

### Issue: Frontend Can't Connect to Backend

**Error**: `NetworkError: Failed to fetch`

**Solution**:
1. Check backend is running on http://localhost:5000
2. Verify `VITE_API_URL` in `.env.local`
3. Check CORS settings in backend/src/server.ts

### Issue: VITE_API_URL Not Recognized

**Solution**:
1. Delete `.env.local` and recreate it
2. Restart frontend dev server: `npm run dev`
3. Don't use quotes in `.env.local`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

### Issue: JWT Token Errors

**Error**: `TokenExpiredError` or `INVALID_TOKEN`

**Solution**:
1. Clear localStorage: Open DevTools → Application → Local Storage → Clear
2. Log out and log back in
3. Check `JWT_SECRET` matches in backend `.env`

---

## 📚 API Testing with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import collection from requests:

```bash
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

3. Copy the `token` from response
4. For protected endpoints, add header:
   ```
   Authorization: Bearer <token>
   ```

---

## 🚀 Next Steps

### Development
- Add more features
- Modify UI/styling
- Add payment integration (Stripe, PayPal)
- Add email notifications
- Add product reviews

### Deployment
- Deploy backend to Heroku/Railway/Render
- Deploy frontend to Vercel/Netlify
- Set up CI/CD pipeline
- Configure production database

### Security (Production)
- Use HTTPS only
- Set `NODE_ENV=production`
- Use strong JWT_SECRET
- Implement rate limiting
- Add admin authentication
- Enable database backups

---

## 📞 Support

For issues or questions:
1. Check the main [README.md](./README.md)
2. Review [API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md)
3. Check browser console for errors
4. Check backend server output for logs

---

**Happy coding!** 🎉
