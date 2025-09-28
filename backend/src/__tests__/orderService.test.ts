import { OrderService } from '../services/orderService';
import { CartItem } from '../types';

describe('OrderService', () => {
    describe('processOrder', () => {
        it('should process valid order successfully', () => {
            const cartItems: CartItem[] = [
                { productId: 1, quantity: 2 },
                { productId: 2, quantity: 1 }
            ];

            const result = OrderService.processOrder(cartItems);

            expect(result.order).toBeDefined();
            expect(result.order.items).toHaveLength(2);
            expect(result.order.totalAmount).toBeGreaterThan(0);
            expect(result.order.timestamp).toBeDefined();
            expect(result.invalidProducts).toHaveLength(0);
        });

        it('should handle invalid products in order', () => {
            const cartItems: CartItem[] = [
                { productId: 1, quantity: 2 },
                { productId: 999, quantity: 1 }
            ];

            const result = OrderService.processOrder(cartItems);

            expect(result.order).toBeDefined();
            expect(result.order.items).toHaveLength(1);
            expect(result.invalidProducts).toHaveLength(1);
            expect(result.invalidProducts).toContain(999);
        });

        it('should calculate total amount correctly', () => {
            const cartItems: CartItem[] = [
                { productId: 1, quantity: 2 }, // 99.99 * 2 = 199.98
                { productId: 2, quantity: 1 }  // 299.99 * 1 = 299.99
            ];

            const result = OrderService.processOrder(cartItems);

            // Total should be 199.98 + 299.99 = 499.97
            expect(result.order.totalAmount).toBeCloseTo(499.97, 2);
        });
    });

    describe('calculateCartTotal', () => {
        it('should calculate total for valid cart items', () => {
            const cartItems: CartItem[] = [
                { productId: 1, quantity: 2 },
                { productId: 2, quantity: 1 }
            ];

            const total = OrderService.calculateCartTotal(cartItems);

            expect(total).toBeGreaterThan(0);
            expect(typeof total).toBe('number');
        });

        it('should return 0 for empty cart', () => {
            const cartItems: CartItem[] = [];

            const total = OrderService.calculateCartTotal(cartItems);

            expect(total).toBe(0);
        });

        it('should handle invalid products by excluding them from total', () => {
            const cartItems: CartItem[] = [
                { productId: 1, quantity: 2 },
                { productId: 999, quantity: 1 } // Invalid product
            ];

            const total = OrderService.calculateCartTotal(cartItems);

            // Should only include valid product (product 1)
            expect(total).toBeGreaterThan(0);
            expect(total).toBeLessThan(500); // Should be less than if both products were valid
        });
    });
});
