export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export interface CartItem {
    productId: number;
    quantity: number;
}

export interface Order {
    items: CartItem[];
    totalAmount: number;
    timestamp: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface ValidationError {
    field: string;
    message: string;
}
