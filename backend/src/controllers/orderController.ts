import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';
import { ApiResponse, Order, CartItem } from '../types';

export class OrderController {
    /**
     * Process checkout order
     * POST /api/checkout
     */
    public static async checkout(req: Request, res: Response): Promise<void> {
        try {
            const { items }: { items: CartItem[] } = req.body;

            if (!items || !Array.isArray(items) || items.length === 0) {
                const response: ApiResponse<null> = {
                    success: false,
                    message: 'Cart items are required',
                    error: 'INVALID_CART',
                    data: null
                };
                res.status(400).json(response);
                return;
            }

            const { order, invalidProducts } = OrderService.processOrder(items);

            if (invalidProducts.length > 0) {
                const response: ApiResponse<Order> = {
                    success: false,
                    message: `Some products were not found: ${invalidProducts.join(', ')}`,
                    error: 'INVALID_PRODUCTS',
                    data: order
                };
                res.status(400).json(response);
                return;
            }

            const response: ApiResponse<Order> = {
                success: true,
                data: order,
                message: 'Order processed successfully'
            };

            res.status(200).json(response);
        } catch (error) {
            const response: ApiResponse<null> = {
                success: false,
                message: 'Failed to process order',
                error: 'INTERNAL_ERROR',
                data: null
            };

            res.status(500).json(response);
        }
    }

    /**
     * Calculate cart total
     * POST /api/cart/calculate
     */
    public static async calculateTotal(req: Request, res: Response): Promise<void> {
        try {
            const { items }: { items: CartItem[] } = req.body;

            if (!items || !Array.isArray(items)) {
                const response: ApiResponse<null> = {
                    success: false,
                    message: 'Cart items are required',
                    error: 'INVALID_CART',
                    data: null
                };
                res.status(400).json(response);
                return;
            }

            const total = OrderService.calculateCartTotal(items);

            const response: ApiResponse<{ total: number }> = {
                success: true,
                data: { total },
                message: 'Cart total calculated successfully'
            };

            res.status(200).json(response);
        } catch (error) {
            const response: ApiResponse<null> = {
                success: false,
                message: 'Failed to calculate cart total',
                error: 'INTERNAL_ERROR',
                data: null
            };

            res.status(500).json(response);
        }
    }
}
