import { Router } from 'express';

import {
  createTodoController,
  deleteTodoController,
  editTodoController,
  getAllTodoController,
  statusSetTodoController,
  moveToTrashTodoController,
} from '../controllers/todo';

import {
  userLoginMiddleware,
  checkTodoExistsWithAuthorMiddleware,
} from './../middlewares';

const router = Router();

router.use(userLoginMiddleware);

router.get('/todo/get/all', getAllTodoController);

router.post('/todo/create', createTodoController);

router.put(
  '/todo/edit/:todoId',
  checkTodoExistsWithAuthorMiddleware,
  editTodoController
);

router.put(
  '/todo/status/set/:todoId',
  checkTodoExistsWithAuthorMiddleware,
  statusSetTodoController
);

router.put(
  '/todo/trash/:todoId',
  checkTodoExistsWithAuthorMiddleware,
  moveToTrashTodoController
);

router.delete(
  '/todo/delete/:todoId',
  checkTodoExistsWithAuthorMiddleware,
  deleteTodoController
);

export default router;
