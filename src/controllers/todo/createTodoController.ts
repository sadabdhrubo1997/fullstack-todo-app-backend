import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';
import TodoModel from './../../models/todoModel';

export const createTodoController = async (req: IRequest, res: Response) => {
  const { title, description, subTasks=[] } = req.body;

  // check for all the required fields
  if (!title || !description) {
    return res.status(400).json({
      status: 'error',
      message: 'Todo title and todo description are required.',
    });
  }

  // check todo title field length
  if (title.length > 100) {
    return res.status(400).json({
      status: 'error',
      message: 'Todo title can not be more than 100 characters.',
    });
  }

  // check todo description field length
  if (description.length > 1000) {
    return res.status(400).json({
      status: 'error',
      message: 'Todo description can not be more than 100 characters.',
    });
  }

  try {
    const createdTodo = await TodoModel.create({
      title,
      description,
      userId: req.user.id,
      totalSubTasks: subTasks.length,
    });

    res.status(200).json({ data: createdTodo });

  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong',
    });
  }
};
