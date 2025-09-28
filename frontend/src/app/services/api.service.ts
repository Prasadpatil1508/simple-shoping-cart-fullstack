import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product, CartItem, Order, ApiResponse } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly baseUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    /**
     * Get all products
     */
    getProducts(): Observable<ApiResponse<Product[]>> {
        return this.http.get<ApiResponse<Product[]>>(`${this.baseUrl}/products`)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    /**
     * Get product by ID
     */
    getProductById(id: number): Observable<ApiResponse<Product>> {
        return this.http.get<ApiResponse<Product>>(`${this.baseUrl}/products/${id}`)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    /**
     * Calculate cart total
     */
    calculateCartTotal(items: CartItem[]): Observable<ApiResponse<{ total: number }>> {
        return this.http.post<ApiResponse<{ total: number }>>(`${this.baseUrl}/cart/calculate`, { items })
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    /**
     * Process checkout
     */
    checkout(items: CartItem[]): Observable<ApiResponse<Order>> {
        return this.http.post<ApiResponse<Order>>(`${this.baseUrl}/checkout`, { items })
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    /**
     * Handle HTTP errors
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            if (error.error?.message) {
                errorMessage = error.error.message;
            }
        }

        console.error('API Error:', error);
        return throwError(() => new Error(errorMessage));
    }
}
