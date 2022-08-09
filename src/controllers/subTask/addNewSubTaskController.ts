import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';
import SubTaskModel from '../../models/subTaskModel';
import TodoModel from '../../models/todoModel';
import { sendServerSideError } from '../../utils/helper/sendServerSideError';

export const addNewSubTaskController = async (req: IRequest, res: Response) => {
  const { subTasks = [] } = req.body;
  const { todoId } = req.params;

  const subTasksToAdd = [];

  try {
    if (!subTasks.length) {
      return res.status(400).json({
        status: 'error',
        message: 'Please give minimum one sub tasks.',
      });
    }

    if (subTasks.length) {
      for (let i = 0; i < subTasks.length; i++) {
        const element = subTasks[i];
        const { title, description } = element;

        // check for all the required fields
        if (!title || !description) {
          return res.status(400).json({
            status: 'error',
            message: 'Sub Task title and Sub Task description are required.',
          });
        }

        // check todo title field length
        if (title.length > 100) {
          return res.status(400).json({
            status: 'error',
            message: 'Sub Task title can not be more than 100 characters.',
          });
        }

        // check todo description field length
        if (description.length > 1000) {
          return res.status(400).json({
            status: 'error',
            message:
              'Sub Task description can not be more than 100 characters.',
          });
        }

        element.todo = todoId;
        element.user = req.user.id;
        subTasksToAdd.push(element);
      }
    }

    const data: any = {
      subTasks: [],
      todo: null,
    };

    if (subTasksToAdd.length) {
      const addedSubtasks = await SubTaskModel.insertMany(subTasksToAdd);
      data.subTasks = addedSubtasks;

      const updatedTodo = await TodoModel.findOneAndUpdate(
        { _id: todoId },
        { $inc: { totalSubTasks: subTasksToAdd.length } },
        { new: true }
      );

      data.todo = updatedTodo;
    }

    res.status(200).json({ status: 'success', data });
  } catch (error: any) {
    sendServerSideError(res, error.message);
  }
};
