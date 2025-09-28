import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from './services/cart.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Simple Shopping Cart';
    totalItems = 0;

    private destroy$ = new Subject<void>();

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
        this.cartService.totalItems$
            .pipe(takeUntil(this.destroy$))
            .subscribe(total => {
                this.totalItems = total;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openCart(): void {
        // Use simple data attributes approach
        this.openCartWithDataAttributes();
    }

    private openCartWithDataAttributes(): void {
        try {
            // Ensure the modal element exists
            const modalElement = document.getElementById('cartModal');
            if (!modalElement) {
                console.error('Modal element not found');
                return;
            }

            // Create trigger button with proper attributes
            const triggerButton = document.createElement('button');
            triggerButton.setAttribute('data-bs-toggle', 'modal');
            triggerButton.setAttribute('data-bs-target', '#cartModal');
            triggerButton.setAttribute('data-bs-backdrop', 'static');
            triggerButton.setAttribute('data-bs-keyboard', 'true');
            triggerButton.style.display = 'none';
            document.body.appendChild(triggerButton);

            // Trigger the modal
            triggerButton.click();

            // Clean up the trigger button
            setTimeout(() => {
                if (triggerButton.parentNode) {
                    triggerButton.parentNode.removeChild(triggerButton);
                }
            }, 100);
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    }

    private cleanupModals(): void {
        // Simple cleanup - let Bootstrap handle most of it
        try {
            // Remove all backdrops
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
}
