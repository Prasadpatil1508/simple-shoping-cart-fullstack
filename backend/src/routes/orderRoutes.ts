import { Router } from 'express';
import Joi from 'joi';
import { OrderController } from '../controllers/orderController';
import { ValidationMiddleware } from '../middleware/validation';

const router = Router();

// Validation schemas
const cartItemSchema = Joi.object({
    productId: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().positive().required()
});

const checkoutSchema = Joi.object({
    items: Joi.array().items(cartItemSchema).min(1).required()
});

const calculateTotalSchema = Joi.object({
    items: Joi.array().items(cartItemSchema).required()
});

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Process checkout order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/CartItem'
 *                 minItems: 1
 *             required:
 *               - items
 *     responses:
 *       200:
 *         description: Order processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *                 message:
 *                   type: string
 *                   example: "Order processed successfully"
 *       400:
 *         description: Validation error or invalid products
 *       500:
 *         description: Internal server error
 */
router.post('/checkout', ValidationMiddleware.validateBody(checkoutSchema), OrderController.checkout);

/**
 * @swagger
 * /api/cart/calculate:
 *   post:
 *     summary: Calculate cart total
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/CartItem'
 *             required:
 *               - items
 *     responses:
 *       200:
 *         description: Cart total calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 149.98
 *                 message:
 *                   type: string
 *                   example: "Cart total calculated successfully"
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post('/cart/calculate', ValidationMiddleware.validateBody(calculateTotalSchema), OrderController.calculateTotal);

export default router;
