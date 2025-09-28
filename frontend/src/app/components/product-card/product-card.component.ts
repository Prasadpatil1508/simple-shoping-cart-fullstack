import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
    @Input() product!: Product;
    @Output() addToCart = new EventEmitter<{ productId: number; quantity: number }>();

    constructor(private cartService: CartService) { }

    onAddToCart(): void {
        this.cartService.addToCart(this.product.id, 1);
        this.addToCart.emit({ productId: this.product.id, quantity: 1 });
    }

    isInCart(): boolean {
        return this.cartService.isInCart(this.product.id);
    }

    getItemQuantity(): number {
        return this.cartService.getItemQuantity(this.product.id);
    }
}