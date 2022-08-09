import { Router } from 'express';

import {
  checkTodoExistsWithAuthorMiddleware,
  userLoginMiddleware,
} from '../middlewares';
import {
  addNewSubTaskController,
  editSubTaskController,
  getAllSubTasksController,
} from './../controllers/subTask';

const router = Router();
router.use(userLoginMiddleware);

router.get(
  '/sub-tasks/get/all/:todoId',
  checkTodoExistsWithAuthorMiddleware,
  getAllSubTasksController
);

router.post(
  '/sub-tasks/add/:todoId',
  checkTodoExistsWithAuthorMiddleware,
  addNewSubTaskController
);

router.post(
  '/sub-tasks/edit/:subTaskId',
  checkTodoExistsWithAuthorMiddleware,
  editSubTaskController
);

export default router;
