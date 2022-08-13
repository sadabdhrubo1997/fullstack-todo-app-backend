import { Router } from 'express';

import {
  checkTodoExistsWithAuthorMiddleware,
  checkSubTaskExistsWithAuthorMiddleware,
  userLoginMiddleware,
} from '../middlewares';
 
import {
  addNewSubTaskController,
  deleteSubTaskController,
  editSubTaskController,
  getAllSubTasksController,
  subTaskMarkDoneController,
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

router.put(
  '/sub-tasks/mark/done/:subTaskId',
  checkSubTaskExistsWithAuthorMiddleware,
  subTaskMarkDoneController
);

router.delete(
  '/sub-tasks/delete/:subTaskId',
  checkSubTaskExistsWithAuthorMiddleware,
  deleteSubTaskController
);

export default router;
