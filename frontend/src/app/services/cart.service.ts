import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, CartItem, CartItemWithProduct } from '../models/product.model';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
    private productsSubject = new BehaviorSubject<Product[]>([]);

    public cartItems$ = this.cartItemsSubject.asObservable();
    public products$ = this.productsSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private toastr: ToastrService
    ) {
        this.loadCartFromStorage();
        this.loadProducts();
    }

    /**
     * Get cart items with product details
     */
    get cartItemsWithProducts$(): Observable<CartItemWithProduct[]> {
        return combineLatest([
            this.cartItems$,
            this.products$
        ]).pipe(
            map(([cartItems, products]) => {
                return cartItems.map(cartItem => {
                    const product = products.find(p => p.id === cartItem.productId);
                    return {
                        ...cartItem,
                        product: product || { id: 0, name: 'Unknown Product', price: 0, imageUrl: '' }
                    };
                });
            })
        );
    }

    /**
     * Get total items count
     */
    get totalItems$(): Observable<number> {
        return this.cartItems$.pipe(
            map(items => items.reduce((total, item) => total + item.quantity, 0))
        );
    }

    /**
     * Get total price
     */
    get totalPrice$(): Observable<number> {
        return this.cartItemsWithProducts$.pipe(
            map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
        );
    }

    /**
     * Add item to cart
     */
    addToCart(productId: number, quantity: number = 1): void {
        const currentItems = this.cartItemsSubject.value;
        const existingItem = currentItems.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            currentItems.push({ productId, quantity });
        }

        this.cartItemsSubject.next([...currentItems]);
        this.saveCartToStorage();
        this.toastr.success(`Added to cart!`, 'Success');
    }

    /**
     * Remove item from cart
     */
    removeFromCart(productId: number): void {
        const currentItems = this.cartItemsSubject.value;
        const filteredItems = currentItems.filter(item => item.productId !== productId);
        this.cartItemsSubject.next(filteredItems);
        this.saveCartToStorage();
        this.toastr.info('Item removed from cart', 'Cart Updated');
    }

    /**
     * Update item quantity
     */
    updateQuantity(productId: number, quantity: number): void {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        const currentItems = this.cartItemsSubject.value;
        const item = currentItems.find(item => item.productId === productId);

        if (item) {
            item.quantity = quantity;
            this.cartItemsSubject.next([...currentItems]);
            this.saveCartToStorage();
        }
    }

    /**
     * Clear cart
     */
    clearCart(): void {
        this.cartItemsSubject.next([]);
        this.saveCartToStorage();
        this.toastr.info('Cart cleared', 'Cart Updated');
    }

    /**
     * Get item quantity in cart
     */
    getItemQuantity(productId: number): number {
        const item = this.cartItemsSubject.value.find(item => item.productId === productId);
        return item ? item.quantity : 0;
    }

    /**
     * Check if item is in cart
     */
    isInCart(productId: number): boolean {
        return this.cartItemsSubject.value.some(item => item.productId === productId);
    }

    /**
     * Load products from API
     */
    private loadProducts(): void {
        this.apiService.getProducts().subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.productsSubject.next(response.data);
                }
            },
            error: (error) => {
                console.error('Error loading products:', error);
                this.toastr.error('Failed to load products', 'Error');
            }
        });
    }

    /**
     * Load cart from localStorage
     */
    private loadCartFromStorage(): void {
        try {
            const savedCart = localStorage.getItem('shopping-cart');
            if (savedCart) {
                const cartItems = JSON.parse(savedCart);
                this.cartItemsSubject.next(cartItems);
            }
        } catch (error) {
            console.error('Error loading cart from storage:', error);
        }
    }

    /**
     * Save cart to localStorage
     */
    private saveCartToStorage(): void {
        try {
            localStorage.setItem('shopping-cart', JSON.stringify(this.cartItemsSubject.value));
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    }
}
