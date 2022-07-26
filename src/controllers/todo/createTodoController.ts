import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';
import TodoModel from './../../models/todoModel';
import SubTaskModel from './../../models/subTaskModel';
import { sendServerSideError } from '../../utils/helper/sendServerSideError';

export const createTodoController = async (req: IRequest, res: Response) => {
  const { title, description, subTasks = [] } = req.body;

  const subTasksToAdd = [];

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
      user: req.user.id,
      totalSubTasks: subTasks.length,
    });

    if (subTasks.length) {
      for (let i = 0; i < subTasks.length; i++) {
        const element = subTasks[i];
        // check for all the required fields
        if (!element.title || !element.description) {
          return res.status(400).json({
            status: 'error',
            message: 'Sub Task title and Sub Task description are required.',
          });
        }

        // check todo title field length
        if (element.title.length > 100) {
          return res.status(400).json({
            status: 'error',
            message: 'Sub Task title can not be more than 100 characters.',
          });
        }

        // check todo description field length
        if (element.description.length > 1000) {
          return res.status(400).json({
            status: 'error',
            message:
              'Sub Task description can not be more than 100 characters.',
          });
        }
        element.todo = createdTodo._id;
        element.user = req.user.id;
        subTasksToAdd.push(element);
      }
    }
    const data: any = {
      todo: createdTodo,
      subTasks: [],
    };

    if (subTasksToAdd.length) {
      const addedSubtasks = await SubTaskModel.insertMany(subTasksToAdd);
      data.subTasks = addedSubtasks;
    }

    res.status(200).json({ status: 'success', data });
  } catch (error: any) {
    sendServerSideError(res, error.message);
  }
};
