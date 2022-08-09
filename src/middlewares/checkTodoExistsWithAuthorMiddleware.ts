import { NextFunction, Response } from 'express';
import { IRequest } from '../constants/interfaces';
import TodoModel from '../models/todoModel';
import { sendServerSideError } from '../utils/helper/sendServerSideError';

export const checkTodoExistsWithAuthorMiddleware = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { todoId } = req.params;

  // check for Todo Id through params
  if (!todoId) {
    return res.status(400).json({
      status: 'error',
      message: 'Todo Id through params is required.',
    });
  }

  try {
    // check if the task exists with id
    const existingTodo = await TodoModel.findOne({
      _id: todoId,
      user: req.user.id,
    }).lean();

    if (!existingTodo) {
      return res.status(400).json({
        status: 'error',
        message: 'Todo does not exists or you do not have permission.',
      });
    }

    const tmp = {
      todo: existingTodo,
    };

    req.temp = tmp;

    next();
  } catch (error: any) {
    return sendServerSideError(res, error.message);
  }
};
