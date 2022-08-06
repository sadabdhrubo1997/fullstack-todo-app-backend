import { Router } from 'express';
import {
  createTodoController,
  editTodoController,
  statusSetTodoController,
} from '../controllers/todo';

import {
  userLoginMiddleware,
  checkTodoExistsWithAuthorMiddleware,
} from './../middlewares';

const router = Router();

router.post('/todo/create', userLoginMiddleware, createTodoController);

router.put(
  '/todo/edit/:todoId',
  userLoginMiddleware,
  checkTodoExistsWithAuthorMiddleware,
  editTodoController
);

router.put(
  '/todo/status/set/:todoId',
  userLoginMiddleware,
  checkTodoExistsWithAuthorMiddleware,
  statusSetTodoController
);

export default router;
