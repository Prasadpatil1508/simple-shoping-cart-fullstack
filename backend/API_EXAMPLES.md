# API Usage Examples

This document provides practical examples of how to use the Simple Shopping Cart API.

## Base URL
```
http://localhost:3000
```

## 1. Health Check

Check if the server is running:

```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2023-12-01T10:30:00.000Z",
  "uptime": 123.456
}
```

## 2. Get All Products

Retrieve all available products:

```bash
curl http://localhost:3000/api/products
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Bluetooth Headphones",
      "price": 99.99,
      "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
    },
    {
      "id": 2,
      "name": "Smart Watch Series 5",
      "price": 299.99,
      "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
    }
    // ... more products
  ],
  "message": "Products retrieved successfully"
}
```

## 3. Get Product by ID

Retrieve a specific product:

```bash
curl http://localhost:3000/api/products/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Wireless Bluetooth Headphones",
    "price": 99.99,
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
  },
  "message": "Product retrieved successfully"
}
```

## 4. Calculate Cart Total

Calculate the total price for cart items:

```bash
curl -X POST http://localhost:3000/api/cart/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"productId": 1, "quantity": 2},
      {"productId": 2, "quantity": 1}
    ]
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 499.97
  },
  "message": "Cart total calculated successfully"
}
```

## 5. Process Checkout

Submit an order for processing:

```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"productId": 1, "quantity": 2},
      {"productId": 2, "quantity": 1}
    ]
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {"productId": 1, "quantity": 2},
      {"productId": 2, "quantity": 1}
    ],
    "totalAmount": 499.97,
    "timestamp": "2023-12-01T10:30:00.000Z"
  },
  "message": "Order processed successfully"
}
```

## Error Examples

### Invalid Product ID
```bash
curl http://localhost:3000/api/products/999
```

**Response:**
```json
{
  "success": false,
  "message": "Product not found",
  "error": "PRODUCT_NOT_FOUND",
  "data": null
}
```

### Validation Error
```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"productId": "invalid", "quantity": 2}
    ]
  }'
```

**Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "VALIDATION_ERROR",
  "data": null,
  "validationErrors": [
    {
      "field": "items.0.productId",
      "message": "\"productId\" must be a number"
    }
  ]
}
```

## Frontend Integration

### JavaScript/TypeScript Example

```javascript
// Fetch products
async function getProducts() {
  const response = await fetch('http://localhost:3000/api/products');
  const data = await response.json();
  return data.data;
}

// Add to cart
async function addToCart(productId, quantity) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Calculate total
async function calculateTotal(cartItems) {
  const response = await fetch('http://localhost:3000/api/cart/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cartItems })
  });
  const data = await response.json();
  return data.data.total;
}

// Checkout
async function checkout(cartItems) {
  const response = await fetch('http://localhost:3000/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cartItems })
  });
  const data = await response.json();
  return data;
}
```

## Testing with Postman

1. Import the collection or create requests manually
2. Set base URL to `http://localhost:3000`
3. Use the examples above for request bodies
4. Check the interactive documentation at `http://localhost:3000/api-docs`
