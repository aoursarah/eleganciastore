# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE"
}
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Request body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

### Login User
**POST** `/auth/login`

Request body:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

Response: (Same as register)

### Get User Profile
**GET** `/auth/me` (🔒 Protected)

Response:
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

### Update User Profile
**PUT** `/auth/profile` (🔒 Protected)

Request body (all fields optional):
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "123-456-7890",
  "address": "456 Oak Ave",
  "city": "Los Angeles",
  "state": "CA",
  "zipCode": "90001",
  "country": "USA"
}
```

Response: (Updated user data)

---

## Product Endpoints

### Get All Products
**GET** `/products`

Query parameters:
- `category` (optional): Filter by category (Dresses, Tops, Bottoms, Outerwear, Accessories, Shoes)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)

Example: `/products?category=Dresses&page=1&limit=12`

Response:
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "_id": "product_id",
      "name": "Silk Slip Dress",
      "price": 189,
      "category": "Dresses",
      "image": "https://...",
      "description": "Elegant silk slip dress",
      "colors": ["Black", "White"],
      "sizes": ["XS", "S", "M", "L", "XL"],
      "stock": 50,
      "rating": 4.5,
      "reviews": 12
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 12,
    "pages": 9
  }
}
```

### Get Product by ID
**GET** `/products/:id`

Response: (Single product object)

### Search Products
**GET** `/products/search/:query`

Example: `/products/search/dress`

Response: (Array of matching products)

### Create Product
**POST** `/products` (🔒 Protected - Admin only)

Request body:
```json
{
  "name": "New Dress",
  "price": 199,
  "category": "Dresses",
  "image": "https://...",
  "description": "Beautiful new dress",
  "colors": ["Black", "Red"],
  "sizes": ["S", "M", "L"],
  "stock": 100
}
```

### Update Product
**PUT** `/products/:id` (🔒 Protected - Admin only)

Request body: (Same as create, all fields optional)

### Delete Product
**DELETE** `/products/:id` (🔒 Protected - Admin only)

---

## Order Endpoints

### Get User Orders
**GET** `/orders` (🔒 Protected)

Response:
```json
{
  "success": true,
  "message": "Orders retrieved successfully",
  "data": [
    {
      "_id": "order_id",
      "userId": "user_id",
      "items": [
        {
          "productId": "product_id",
          "name": "Silk Slip Dress",
          "price": 189,
          "quantity": 2,
          "color": "Black",
          "size": "M",
          "image": "https://..."
        }
      ],
      "totalAmount": 378,
      "status": "delivered",
      "shippingAddress": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "123-456-7890",
        "address": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "paymentMethod": "credit_card",
      "paymentStatus": "completed",
      "trackingNumber": "TRACK1234567890",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-20T14:45:00Z"
    }
  ]
}
```

### Get Order by ID
**GET** `/orders/:id` (🔒 Protected)

Response: (Single order object)

### Create Order
**POST** `/orders` (🔒 Protected)

Request body:
```json
{
  "items": [
    {
      "productId": "product_id",
      "name": "Silk Slip Dress",
      "price": 189,
      "quantity": 1,
      "color": "Black",
      "size": "M",
      "image": "https://..."
    }
  ],
  "totalAmount": 189,
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

Response:
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "order_id",
    "trackingNumber": "TRACK1234567890",
    "status": "confirmed",
    ...
  }
}
```

### Update Order Status
**PUT** `/orders/:id/status` (🔒 Protected - Admin only)

Request body:
```json
{
  "status": "shipping"
}
```

Valid statuses: `pending`, `confirmed`, `shipping`, `delivered`, `cancelled`

### Cancel Order
**POST** `/orders/:id/cancel` (🔒 Protected)

Response: (Updated order with status "cancelled")

---

## Error Codes

| Code | Meaning |
|------|---------|
| `MISSING_FIELDS` | Required fields are missing |
| `PASSWORD_MISMATCH` | Password and confirm password don't match |
| `WEAK_PASSWORD` | Password is too short (minimum 6 characters) |
| `USER_EXISTS` | User with this email already exists |
| `INVALID_CREDENTIALS` | Email or password is incorrect |
| `MISSING_TOKEN` | No token provided in Authorization header |
| `TOKEN_EXPIRED` | JWT token has expired |
| `INVALID_TOKEN` | JWT token is invalid or malformed |
| `NOT_AUTHENTICATED` | User is not authenticated |
| `PRODUCT_NOT_FOUND` | Product does not exist |
| `ORDER_NOT_FOUND` | Order does not exist |
| `EMPTY_ORDER` | Order contains no items |
| `INVALID_AMOUNT` | Order amount is invalid |
| `MISSING_ADDRESS` | Shipping address is required |
| `INVALID_STATUS` | Order status is invalid |
| `CANNOT_CANCEL_ORDER` | Order cannot be cancelled in its current status |
| `NOT_FOUND` | Route not found |
| `SERVER_ERROR` | Internal server error |

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider implementing:
- IP-based rate limiting
- API key-based rate limiting
- User-based rate limiting

## CORS

CORS is enabled for the frontend URL specified in `.env` (FRONTEND_URL).

Default: `http://localhost:5173`
