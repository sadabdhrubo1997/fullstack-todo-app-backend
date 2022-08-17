import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';
import TodoModel from '../../models/todoModel';

export const getAllTodoController = async (req: IRequest, res: Response) => {
  const { trash=false, limit = 10, skip = 0, status = '' } = req.query;

  try {
    let count, allTodo;

    if (
      status === 'new' ||
      status === 'ongoing' ||
      status === 'paused' ||
      status === 'done'
    ) {
      count = await TodoModel.count({
        user: req.user.id,
        trash: trash && true,
        status,
      });

      allTodo = await TodoModel.find({
        user: req.user.id,
        trash: trash && true,
        status,
      })
        .select('-__v')
        .limit(+limit)
        .skip(+skip);
    } else {
      count = await TodoModel.count({
        user: req.user.id,
        trash: trash && true,
      });

      allTodo = await TodoModel.find({
        user: req.user.id,
        trash: trash && true,
      })
        .select('-__v')
        .limit(+limit)
        .skip(+skip);
    }
    res
      .status(200)
      .json({ status: 'success', data: { todos: allTodo, count } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
