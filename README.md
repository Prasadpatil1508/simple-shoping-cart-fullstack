# Simple Shopping Cart - Full Stack Application

A modern, responsive shopping cart application built with Angular 17 frontend and Node.js/Express TypeScript backend. This project demonstrates a complete e-commerce solution with product catalog, shopping cart functionality, and order processing.

## 🚀 Features

### Frontend (Angular 17)
- **Modern UI/UX**: Clean, responsive design with Bootstrap 5
- **Product Catalog**: Browse products with search functionality
- **Shopping Cart**: Add/remove items, update quantities
- **Real-time Updates**: Live cart total and item count
- **Modal Interface**: Smooth cart modal with checkout process
- **Toast Notifications**: User feedback with ngx-toastr
- **TypeScript**: Full type safety and modern development experience

### Backend (Node.js/Express)
- **RESTful API**: Well-structured API endpoints
- **TypeScript**: Type-safe server-side development
- **Input Validation**: Joi validation for request data
- **API Documentation**: Swagger/OpenAPI documentation
- **Error Handling**: Comprehensive error management
- **Security**: CORS, Helmet, and rate limiting
- **Testing**: Jest test suite included

## 🛠️ Tech Stack

### Frontend
- **Angular 17** - Modern web framework
- **Bootstrap 5** - CSS framework for responsive design
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **ngx-toastr** - Toast notifications
- **Popper.js** - Tooltip and popover positioning

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **Joi** - Data validation
- **Swagger** - API documentation
- **Jest** - Testing framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

## 📁 Project Structure

```
simple-shoping-cart-fullstack/
├── frontend/                 # Angular 17 frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Angular components
│   │   │   │   ├── cart-modal/
│   │   │   │   ├── product-card/
│   │   │   │   └── product-grid/
│   │   │   ├── models/       # TypeScript interfaces
│   │   │   ├── services/     # Angular services
│   │   │   └── app.component.*
│   │   └── styles.scss
│   ├── package.json
│   └── angular.json
├── backend/                  # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── services/         # Business logic
│   │   ├── middleware/       # Custom middleware
│   │   ├── routes/           # API routes
│   │   ├── types/            # TypeScript types
│   │   └── server.ts         # Main server file
│   ├── dist/                 # Compiled JavaScript
│   ├── scripts/              # Utility scripts
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Angular CLI** (v17 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simple-shoping-cart-fullstack
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Development Setup

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The API will be available at `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The application will be available at `http://localhost:4200`

3. **Access API Documentation**
   Visit `http://localhost:3000/api-docs` for interactive API documentation

## 📚 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Cart Operations
- `POST /api/cart/calculate` - Calculate cart total
- `POST /api/checkout` - Process order checkout

### Health Check
- `GET /health` - Server health status

For detailed API documentation with examples, see [API_EXAMPLES.md](backend/API_EXAMPLES.md)

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:api      # Test API endpoints
```

### Frontend Tests
```bash
cd frontend
npm test              # Run unit tests
```

## 🏗️ Building for Production

### Backend
```bash
cd backend
npm run build         # Compile TypeScript
npm start            # Start production server
```

### Frontend
```bash
cd frontend
npm run build        # Build for production
```

The built files will be in the `dist/` directory.

## 🔧 Configuration

### Backend Configuration
- **Port**: 3000 (default)
- **CORS**: Enabled for frontend origin
- **Rate Limiting**: 100 requests per 15 minutes
- **API Documentation**: Available at `/api-docs`

### Frontend Configuration
- **Port**: 4200 (default)
- **API Base URL**: `http://localhost:3000`
- **Bootstrap**: Responsive design system
- **Toast Notifications**: Success/error feedback

## 🎯 Key Features Implementation

### Shopping Cart
- **Add to Cart**: Click product cards to add items
- **Quantity Management**: Increase/decrease item quantities
- **Remove Items**: Delete items from cart
- **Real-time Total**: Live calculation of cart total
- **Persistent Storage**: Cart state maintained during session

### Product Management
- **Product Grid**: Responsive grid layout
- **Search Functionality**: Filter products by name or price
- **Product Details**: Image, name, and price display
- **Loading States**: Spinner during data fetching

### Order Processing
- **Checkout Flow**: Complete order submission
- **Validation**: Input validation and error handling
- **Success Feedback**: Toast notifications for user actions
- **Cart Clearing**: Automatic cart reset after successful checkout

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend is running on port 3000
   - Check CORS configuration in backend

2. **API Connection Issues**
   - Verify backend server is running
   - Check API base URL in frontend services

3. **Build Errors**
   - Ensure all dependencies are installed
   - Check Node.js version compatibility

4. **Modal Issues**
   - Clear browser cache
   - Check Bootstrap CSS/JS loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Angular Team** - For the amazing framework
- **Bootstrap Team** - For the responsive CSS framework
- **Express.js Team** - For the robust web framework
- **TypeScript Team** - For the type-safe JavaScript

## 📞 Support

If you encounter any issues or have questions:

1. Check the [API Documentation](http://localhost:3000/api-docs)
2. Review the [API Examples](backend/API_EXAMPLES.md)
3. Open an issue in the repository
4. Check the troubleshooting section above

---

**Happy Shopping! 🛒✨**