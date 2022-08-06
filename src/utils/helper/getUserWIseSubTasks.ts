import SubTaskModel from '../../models/subTaskModel';
import { NextFunction } from 'express';

interface IOption {
  userId: string;
  todoId: string;
  next: NextFunction;
}

export const getUserWIseSubTasks = async ({
  userId,
  todoId,
  next,
}: IOption) => {
  try {
    const subTasks = await SubTaskModel.find({ userId, todoId });
    return subTasks;
  } catch (error: any) {
    return next(error);
  }
};
