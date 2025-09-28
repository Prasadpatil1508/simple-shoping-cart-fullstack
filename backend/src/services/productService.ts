import { Product } from '../types';

export class ProductService {
    private static products: Product[] = [
        {
            id: 1,
            name: 'Wireless Bluetooth Headphones',
            price: 99.99,
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
        },
        {
            id: 2,
            name: 'Smart Watch Series 5',
            price: 299.99,
            imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
        },
        {
            id: 3,
            name: 'Mechanical Gaming Keyboard',
            price: 149.99,
            imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop'
        },
        {
            id: 4,
            name: 'Wireless Mouse',
            price: 49.99,
            imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop'
        },
        {
            id: 5,
            name: 'USB-C Hub',
            price: 79.99,
            imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop'
        },
        {
            id: 6,
            name: 'Portable Power Bank',
            price: 39.99,
            imageUrl: 'https://images.unsplash.com/photo-1609592807905-7b0a0b0b0b0b?w=300&h=300&fit=crop'
        },
        {
            id: 7,
            name: 'Bluetooth Speaker',
            price: 89.99,
            imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop'
        },
        {
            id: 8,
            name: 'Gaming Mouse Pad',
            price: 24.99,
            imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=300&fit=crop'
        }
    ];

    /**
     * Get all products
     */
    public static getAllProducts(): Product[] {
        return this.products;
    }

    /**
     * Get product by ID
     */
    public static getProductById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    /**
     * Validate if products exist and return valid products with prices
     */
    public static validateProducts(cartItems: { productId: number; quantity: number }[]): {
        validItems: Array<{ product: Product; quantity: number }>;
        invalidIds: number[];
    } {
        const validItems: Array<{ product: Product; quantity: number }> = [];
        const invalidIds: number[] = [];

        for (const item of cartItems) {
            const product = this.getProductById(item.productId);
            if (product) {
                validItems.push({ product, quantity: item.quantity });
            } else {
                invalidIds.push(item.productId);
            }
        }

        return { validItems, invalidIds };
    }
}
