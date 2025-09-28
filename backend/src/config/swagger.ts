import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Simple Shopping Cart API',
        version: '1.0.0',
        description: 'A minimal e-commerce API for managing products and shopping cart',
        contact: {
            name: 'API Support',
            email: 'support@example.com'
        }
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server'
        }
    ],
    components: {
        schemas: {
            Product: {
                type: 'object',
                required: ['id', 'name', 'price', 'imageUrl'],
                properties: {
                    id: {
                        type: 'integer',
                        description: 'Unique product identifier',
                        example: 1
                    },
                    name: {
                        type: 'string',
                        description: 'Product name',
                        example: 'Wireless Bluetooth Headphones'
                    },
                    price: {
                        type: 'number',
                        format: 'float',
                        description: 'Product price in USD',
                        example: 99.99
                    },
                    imageUrl: {
                        type: 'string',
                        format: 'uri',
                        description: 'Product image URL',
                        example: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
                    }
                }
            },
            CartItem: {
                type: 'object',
                required: ['productId', 'quantity'],
                properties: {
                    productId: {
                        type: 'integer',
                        description: 'Product ID',
                        example: 1
                    },
                    quantity: {
                        type: 'integer',
                        minimum: 1,
                        description: 'Quantity of the product',
                        example: 2
                    }
                }
            },
            Order: {
                type: 'object',
                required: ['items', 'totalAmount', 'timestamp'],
                properties: {
                    items: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/CartItem'
                        },
                        description: 'List of items in the order'
                    },
                    totalAmount: {
                        type: 'number',
                        format: 'float',
                        description: 'Total amount of the order',
                        example: 199.98
                    },
                    timestamp: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Order timestamp',
                        example: '2023-12-01T10:30:00.000Z'
                    }
                }
            },
            ApiResponse: {
                type: 'object',
                required: ['success'],
                properties: {
                    success: {
                        type: 'boolean',
                        description: 'Indicates if the request was successful',
                        example: true
                    },
                    data: {
                        description: 'Response data (varies by endpoint)'
                    },
                    message: {
                        type: 'string',
                        description: 'Response message',
                        example: 'Operation completed successfully'
                    },
                    error: {
                        type: 'string',
                        description: 'Error code (only present when success is false)',
                        example: 'VALIDATION_ERROR'
                    }
                }
            },
            ValidationError: {
                type: 'object',
                properties: {
                    field: {
                        type: 'string',
                        description: 'Field that failed validation',
                        example: 'items.0.productId'
                    },
                    message: {
                        type: 'string',
                        description: 'Validation error message',
                        example: 'Product ID must be a positive integer'
                    }
                }
            }
        }
    },
    tags: [
        {
            name: 'Products',
            description: 'Product management endpoints'
        },
        {
            name: 'Orders',
            description: 'Order and cart management endpoints'
        }
    ]
};

const options = {
    definition: swaggerDefinition,
    apis: ['./src/routes/*.ts'] // Path to the API files
};

export const swaggerSpec = swaggerJsdoc(options);
