import { CartItem, Order } from '../types';
import { ProductService } from './productService';

export class OrderService {
    /**
     * Process checkout order
     */
    public static processOrder(cartItems: CartItem[]): { order: Order; invalidProducts: number[] } {
        const { validItems, invalidIds } = ProductService.validateProducts(cartItems);

        // Calculate total amount
        const totalAmount = validItems.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        // Create order
        const order: Order = {
            items: validItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            })),
            totalAmount: Math.round(totalAmount * 100) / 100, // Round to 2 decimal places
            timestamp: new Date().toISOString()
        };

        // Log order to console
        console.log('=== NEW ORDER ===');
        console.log('Order Details:', JSON.stringify(order, null, 2));
        console.log('Items:');
        validItems.forEach(item => {
            console.log(`- ${item.product.name} (ID: ${item.product.id}) x${item.quantity} = $${(item.product.price * item.quantity).toFixed(2)}`);
        });
        console.log(`Total Amount: $${order.totalAmount}`);
        console.log('================');

        return { order, invalidProducts: invalidIds };
    }

    /**
     * Calculate cart total
     */
    public static calculateCartTotal(cartItems: CartItem[]): number {
        const { validItems } = ProductService.validateProducts(cartItems);

        const total = validItems.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        return Math.round(total * 100) / 100;
    }
}
