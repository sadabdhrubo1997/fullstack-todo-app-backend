import { Router } from 'express';

import todoRoutes from './todoRoutes';
import userRoutes from './userRoutes';
import subTasksRoute from './subTaskRoutes';

const router = Router();

router.use(userRoutes);
router.use(todoRoutes);
router.use(subTasksRoute);

export default router;
