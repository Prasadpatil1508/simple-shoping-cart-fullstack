import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ApiResponse, ValidationError } from '../types';

export class ValidationMiddleware {
    /**
     * Validate request body against Joi schema
     */
    public static validateBody(schema: Joi.ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction): void => {
            const { error, value } = schema.validate(req.body, { abortEarly: false });

            if (error) {
                const validationErrors: ValidationError[] = error.details.map(detail => ({
                    field: detail.path.join('.'),
                    message: detail.message
                }));

                const response: ApiResponse<null> = {
                    success: false,
                    message: 'Validation failed',
                    error: 'VALIDATION_ERROR',
                    data: null
                };

                res.status(400).json({
                    ...response,
                    validationErrors
                });
                return;
            }

            req.body = value;
            next();
        };
    }

    /**
     * Validate request query parameters
     */
    public static validateQuery(schema: Joi.ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction): void => {
            const { error, value } = schema.validate(req.query, { abortEarly: false });

            if (error) {
                const validationErrors: ValidationError[] = error.details.map(detail => ({
                    field: detail.path.join('.'),
                    message: detail.message
                }));

                const response: ApiResponse<null> = {
                    success: false,
                    message: 'Query validation failed',
                    error: 'VALIDATION_ERROR',
                    data: null
                };

                res.status(400).json({
                    ...response,
                    validationErrors
                });
                return;
            }

            req.query = value;
            next();
        };
    }
}
