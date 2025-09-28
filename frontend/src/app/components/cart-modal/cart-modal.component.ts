import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartItemWithProduct } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cart-modal',
    templateUrl: './cart-modal.component.html',
    styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit, OnDestroy {
    @ViewChild('cartModal', { static: false }) cartModal!: ElementRef;

    cartItems: CartItemWithProduct[] = [];
    totalPrice = 0;
    totalItems = 0;
    isProcessing = false;

    private destroy$ = new Subject<void>();

    constructor(
        private cartService: CartService,
        private apiService: ApiService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.cartService.cartItemsWithProducts$
            .pipe(takeUntil(this.destroy$))
            .subscribe(items => {
                this.cartItems = items;
            });

        this.cartService.totalPrice$
            .pipe(takeUntil(this.destroy$))
            .subscribe(total => {
                this.totalPrice = total;
            });

        this.cartService.totalItems$
            .pipe(takeUntil(this.destroy$))
            .subscribe(total => {
                this.totalItems = total;
            });

        // Initialize modal properly
        this.initializeModal();
    }

    private initializeModal(): void {
        // Simple event listeners for modal events
        setTimeout(() => {
            if (this.cartModal) {
                this.cartModal.nativeElement.addEventListener('shown.bs.modal', () => {
                    this.isProcessing = false; // Reset processing state when modal is shown
                });

                this.cartModal.nativeElement.addEventListener('hidden.bs.modal', () => {
                    // Simple cleanup after modal is hidden
                    this.cleanupModal();
                });
            }
        }, 100);
    }

    private ensureModalStructure(modalElement: HTMLElement): void {
        // Ensure modal has proper structure for Bootstrap
        if (!modalElement.querySelector('.modal-dialog')) {
            console.warn('Modal dialog not found, creating structure');
            const dialog = document.createElement('div');
            dialog.className = 'modal-dialog modal-lg';
            const content = document.createElement('div');
            content.className = 'modal-content';
            dialog.appendChild(content);
            modalElement.appendChild(dialog);
        }
    }

    ngOnDestroy(): void {
        this.isProcessing = false;
        this.cleanupModal();
        this.destroy$.next();
        this.destroy$.complete();
    }

    updateQuantity(productId: number, quantity: number | string): void {
        const qty = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;
        if (isNaN(qty) || qty < 1) {
            this.removeItem(productId);
            return;
        }
        this.cartService.updateQuantity(productId, qty);
    }

    removeItem(productId: number): void {
        this.cartService.removeFromCart(productId);
    }

    clearCart(): void {
        this.cartService.clearCart();
    }

    onModalClose(): void {
        this.cleanupModal();
    }

    onCloseModal(): void {
        // The close button now uses data-bs-dismiss="modal" so this is handled by Bootstrap
        // This method can be removed or kept for any additional cleanup if needed
    }

    // Global cleanup method that can be called from anywhere
    static cleanupAllModals(): void {
        // Remove all backdrops
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => backdrop.remove());

        // Remove modal-open class and reset body styles
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

        // Force cleanup of any remaining modal elements
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            (modal as HTMLElement).style.display = 'none';
        });

        // Force a reflow to ensure cleanup
        document.body.offsetHeight;
    }

    checkout(): void {
        if (this.cartItems.length === 0) {
            this.toastr.warning('Your cart is empty', 'Warning');
            return;
        }

        this.isProcessing = true;
        const cartItems = this.cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));

        // Set a timeout to prevent infinite processing state
        const timeoutId = setTimeout(() => {
            if (this.isProcessing) {
                console.warn('Checkout request timed out');
                this.isProcessing = false;
                this.toastr.error('Checkout request timed out. Please try again.', 'Error');
            }
        }, 10000); // 10 second timeout

        this.apiService.checkout(cartItems).subscribe({
            next: (response) => {
                clearTimeout(timeoutId);
                if (response.success) {
                    this.toastr.success('Order placed successfully!', 'Success');
                    this.cartService.clearCart();
                    // Close modal after a short delay to show success message
                    setTimeout(() => {
                        this.closeModalAfterCheckout();
                    }, 500);
                } else {
                    this.toastr.error(response.message || 'Checkout failed', 'Error');
                }
                this.isProcessing = false;
            },
            error: (error) => {
                clearTimeout(timeoutId);
                console.error('Checkout error:', error);
                this.toastr.error('Checkout failed. Please try again.', 'Error');
                this.isProcessing = false;
            },
            complete: () => {
                clearTimeout(timeoutId);
                // Ensure isProcessing is set to false even if something goes wrong
                this.isProcessing = false;
            }
        });
    }



    private closeModalAfterCheckout(): void {
        try {
            const modalElement = document.getElementById('cartModal');
            if (modalElement) {
                // Use Bootstrap's modal instance if available
                const modalInstance = (window as any).bootstrap?.Modal?.getInstance(modalElement);
                if (modalInstance && typeof modalInstance.hide === 'function') {
                    modalInstance.hide();
                } else {
                    // Fallback: manually hide the modal
                    modalElement.classList.remove('show');
                    modalElement.style.display = 'none';
                    modalElement.setAttribute('aria-hidden', 'true');
                    modalElement.removeAttribute('aria-modal');

                    // Clean up backdrop and body
                    this.cleanupModal();
                }
            }
        } catch (error) {
            console.warn('Error closing modal after checkout:', error);
            // Fallback cleanup
            this.cleanupModal();
        }
    }

    private cleanupModal(): void {
        // Minimal cleanup - let Bootstrap handle most of it
        try {
            // Only remove backdrops if they exist
            const backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach(backdrop => {
                if (backdrop && backdrop.parentNode) {
                    backdrop.remove();
                }
            });

            // Reset body styles
            if (document.body) {
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            }
        } catch (error) {
            console.warn('Error during modal cleanup:', error);
        }
    }

    trackByProductId(index: number, item: CartItemWithProduct): number {
        return item.productId;
    }
}