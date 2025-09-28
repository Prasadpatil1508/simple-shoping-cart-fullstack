import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { ApiResponse, Product } from '../types';

export class ProductController {
    /**
     * Get all products
     * GET /api/products
     */
    public static async getProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = ProductService.getAllProducts();

            const response: ApiResponse<Product[]> = {
                success: true,
                data: products,
                message: 'Products retrieved successfully'
            };

            res.status(200).json(response);
        } catch (error) {
            const response: ApiResponse<null> = {
                success: false,
                message: 'Failed to retrieve products',
                error: 'INTERNAL_ERROR',
                data: null
            };

            res.status(500).json(response);
        }
    }

    /**
     * Get product by ID
     * GET /api/products/:id
     */
    public static async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const productId = parseInt(req.params.id, 10);

            if (isNaN(productId)) {
                const response: ApiResponse<null> = {
                    success: false,
                    message: 'Invalid product ID',
                    error: 'INVALID_ID',
                    data: null
                };
                res.status(400).json(response);
                return;
            }

            const product = ProductService.getProductById(productId);

            if (!product) {
                const response: ApiResponse<null> = {
                    success: false,
                    message: 'Product not found',
                    error: 'PRODUCT_NOT_FOUND',
                    data: null
                };
                res.status(404).json(response);
                return;
            }

            const response: ApiResponse<Product> = {
                success: true,
                data: product,
                message: 'Product retrieved successfully'
            };

            res.status(200).json(response);
        } catch (error) {
            const response: ApiResponse<null> = {
                success: false,
                message: 'Failed to retrieve product',
                error: 'INTERNAL_ERROR',
                data: null
            };

            res.status(500).json(response);
        }
    }
}
