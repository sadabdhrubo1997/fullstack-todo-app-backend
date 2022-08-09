import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';
import TodoModel from '../../models/todoModel';
import SubTaskModel from '../../models/subTaskModel';

export const getSingleTodoController = async (req: IRequest, res: Response) => {
  try {
    const todo = await TodoModel.find({ user: req.user.id });
    const subTasks = await SubTaskModel.find({});
    res.json(todo);
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
