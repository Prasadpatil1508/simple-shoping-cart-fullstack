import { Router } from 'express';
import productRoutes from './productRoutes';
import orderRoutes from './orderRoutes';

const router = Router();

// API routes
router.use('/products', productRoutes);
router.use('/', orderRoutes);

export default router;
