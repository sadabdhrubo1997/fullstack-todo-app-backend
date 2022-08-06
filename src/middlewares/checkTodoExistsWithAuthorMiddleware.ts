import { NextFunction, Response } from 'express';
import { IRequest } from '../constants/interfaces';
import TodoModel from '../models/todoModel';

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
    const existingTask = await TodoModel.findOne({
      _id: todoId,
      userId: req.user.id,
    });

    if (!existingTask) {
      return res.status(400).json({
        status: 'error',
        message: 'Todo does not exists or you do not have permission.',
      });
    }
    next();
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong',
    });
  }
};
