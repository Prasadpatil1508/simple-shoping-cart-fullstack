import { ProductService } from '../services/productService';
import { Product } from '../types';

describe('ProductService', () => {
    describe('getAllProducts', () => {
        it('should return all products', () => {
            const products = ProductService.getAllProducts();

            expect(products).toBeDefined();
            expect(Array.isArray(products)).toBe(true);
            expect(products.length).toBeGreaterThan(0);

            // Check if all products have required properties
            products.forEach(product => {
                expect(product).toHaveProperty('id');
                expect(product).toHaveProperty('name');
                expect(product).toHaveProperty('price');
                expect(product).toHaveProperty('imageUrl');
                expect(typeof product.id).toBe('number');
                expect(typeof product.name).toBe('string');
                expect(typeof product.price).toBe('number');
                expect(typeof product.imageUrl).toBe('string');
            });
        });
    });

    describe('getProductById', () => {
        it('should return product when valid ID is provided', () => {
            const product = ProductService.getProductById(1);

            expect(product).toBeDefined();
            expect(product?.id).toBe(1);
            expect(product?.name).toBeDefined();
            expect(product?.price).toBeDefined();
            expect(product?.imageUrl).toBeDefined();
        });

        it('should return undefined when invalid ID is provided', () => {
            const product = ProductService.getProductById(999);

            expect(product).toBeUndefined();
        });
    });

    describe('validateProducts', () => {
        it('should return valid items and empty invalid IDs for valid products', () => {
            const cartItems = [
                { productId: 1, quantity: 2 },
                { productId: 2, quantity: 1 }
            ];

            const result = ProductService.validateProducts(cartItems);

            expect(result.validItems).toHaveLength(2);
            expect(result.invalidIds).toHaveLength(0);
            expect(result.validItems[0].product.id).toBe(1);
            expect(result.validItems[0].quantity).toBe(2);
            expect(result.validItems[1].product.id).toBe(2);
            expect(result.validItems[1].quantity).toBe(1);
        });

        it('should return invalid IDs for non-existent products', () => {
            const cartItems = [
                { productId: 1, quantity: 2 },
                { productId: 999, quantity: 1 },
                { productId: 2, quantity: 3 }
            ];

            const result = ProductService.validateProducts(cartItems);

            expect(result.validItems).toHaveLength(2);
            expect(result.invalidIds).toHaveLength(1);
            expect(result.invalidIds).toContain(999);
        });

        it('should return empty arrays for empty cart', () => {
            const cartItems: Array<{ productId: number; quantity: number }> = [];

            const result = ProductService.validateProducts(cartItems);

            expect(result.validItems).toHaveLength(0);
            expect(result.invalidIds).toHaveLength(0);
        });
    });
});
