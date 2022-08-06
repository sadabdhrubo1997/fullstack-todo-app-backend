import { Router } from 'express';
import todoRoutes from './todoRoutes';

import userRoutes from './userRoutes';

const router = Router();

router.use(userRoutes);
router.use(todoRoutes);

export default router;
