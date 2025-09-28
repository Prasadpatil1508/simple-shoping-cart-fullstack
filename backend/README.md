# Simple Shopping Cart Backend

A minimal e-commerce backend API built with Node.js, Express.js, and TypeScript following clean architecture principles.

## Features

- 🛍️ **Product Management**: Get all products or individual products by ID
- 🛒 **Shopping Cart**: Add items to cart and calculate totals
- 💳 **Checkout**: Process orders with validation
- 📚 **API Documentation**: Interactive Swagger/OpenAPI documentation
- 🔒 **Security**: CORS, Helmet, Rate limiting
- ✅ **Validation**: Comprehensive input validation with Joi
- 🧪 **Testing**: Unit tests with Jest
- 🎯 **Clean Architecture**: Routes → Middleware → Controller → Service pattern

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Validation**: Joi
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Linting**: ESLint
- **Security**: Helmet, CORS, Rate Limiting

## Project Structure

```
src/
├── config/
│   └── swagger.ts          # Swagger configuration
├── controllers/
│   ├── productController.ts
│   └── orderController.ts
├── middleware/
│   ├── errorHandler.ts
│   └── validation.ts
├── routes/
│   ├── index.ts
│   ├── productRoutes.ts
│   └── orderRoutes.ts
├── services/
│   ├── productService.ts
│   └── orderService.ts
├── types/
│   └── index.ts
├── __tests__/
│   ├── productService.test.ts
│   └── orderService.test.ts
└── server.ts
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Start the server:
```bash
npm start
```

For development:
```bash
npm run dev
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Orders
- `POST /api/checkout` - Process checkout order
- `POST /api/cart/calculate` - Calculate cart total

### Documentation
- `GET /api-docs` - Interactive API documentation
- `GET /health` - Health check endpoint

## API Documentation

Once the server is running, visit `http://localhost:3000/api-docs` to access the interactive Swagger documentation.

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Linting

Check code quality:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3001)

## Example Usage

### Get all products
```bash
curl http://localhost:3000/api/products
```

### Process checkout
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

## Clean Architecture

This project follows clean architecture principles:

- **Routes**: Handle HTTP requests and responses
- **Middleware**: Validation and error handling
- **Controllers**: Business logic coordination
- **Services**: Core business logic
- **Types**: TypeScript type definitions

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE",
  "data": null
}
```

## Security Features

- **CORS**: Configured for frontend integration
- **Helmet**: Security headers
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation with Joi
- **Error Handling**: Secure error responses without sensitive data
