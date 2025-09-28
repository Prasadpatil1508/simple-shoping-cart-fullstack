import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-product-grid',
    templateUrl: './product-grid.component.html',
    styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    filteredProducts: Product[] = [];
    searchQuery = '';
    isLoading = false;

    private searchSubject = new Subject<string>();
    private destroy$ = new Subject<void>();

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
        this.loadProducts();
        this.setupSearch();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSearchChange(query: string | Event): void {
        const searchValue = typeof query === 'string' ? query : (query.target as HTMLInputElement).value;
        this.searchSubject.next(searchValue);
    }

    trackByProductId(index: number, product: Product): number {
        return product.id;
    }

    private setupSearch(): void {
        this.searchSubject
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe(query => {
                this.searchQuery = query;
                this.filterProducts();
            });
    }

    private loadProducts(): void {
        this.isLoading = true;
        this.cartService.products$.subscribe({
            next: (products) => {
                this.products = products;
                this.filteredProducts = products;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading products:', error);
                this.isLoading = false;
            }
        });
    }

    private filterProducts(): void {
        if (!this.searchQuery.trim()) {
            this.filteredProducts = this.products;
            return;
        }

        const query = this.searchQuery.toLowerCase().trim();
        this.filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.price.toString().includes(query)
        );
    }

    onAddToCart(event: { productId: number; quantity: number }): void {
        console.log('Product added to cart:', event);
    }
}