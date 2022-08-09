import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';
import TodoModel from '../../models/todoModel';

export const getAllTodoController = async (req: IRequest, res: Response) => {
  const { trash, limit = 10, skip = 0 } = req.query;

  try {
    const allTodo = await TodoModel.find({
      user: req.user.id,
      trash,
    })
      .select('-user -__v')
      .limit(+limit)
      .skip(+skip);
    res.json({ status: 'success', todos: allTodo });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
