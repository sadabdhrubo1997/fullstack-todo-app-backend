import { Router } from 'express';

import {
  checkTodoExistsWithAuthorMiddleware,
  checkSubTaskExistsWithAuthorMiddleware,
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

router.put(
  '/sub-tasks/edit/:subTaskId',
  checkSubTaskExistsWithAuthorMiddleware,
  editSubTaskController
);

export default router;
