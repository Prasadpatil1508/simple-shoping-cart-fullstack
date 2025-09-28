import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export class ErrorHandler {
    /**
     * Global error handling middleware
     */
    public static handleError(
        error: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        console.error('Error occurred:', error);

        let statusCode = 500;
        let message = 'Internal Server Error';

        // Handle specific error types
        if (error.name === 'ValidationError') {
            statusCode = 400;
            message = 'Validation Error';
        } else if (error.name === 'UnauthorizedError') {
            statusCode = 401;
            message = 'Unauthorized';
        } else if (error.name === 'ForbiddenError') {
            statusCode = 403;
            message = 'Forbidden';
        } else if (error.name === 'NotFoundError') {
            statusCode = 404;
            message = 'Not Found';
        }

        const response: ApiResponse<null> = {
            success: false,
            message,
            error: error.name || 'INTERNAL_ERROR',
            data: null
        };

        res.status(statusCode).json(response);
    }

    /**
     * Handle 404 errors
     */
    public static handleNotFound(req: Request, res: Response): void {
        const response: ApiResponse<null> = {
            success: false,
            message: 'Route not found',
            error: 'NOT_FOUND',
            data: null
        };

        res.status(404).json(response);
    }
}
