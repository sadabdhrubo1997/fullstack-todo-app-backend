import { Response } from 'express';

import { IRequest } from '../../constants/interfaces';

import SubTaskModel from '../../models/subTaskModel';
import TodoModel from './../../models/todoModel';

import { sendServerSideError } from '../../utils/helper/sendServerSideError';

export const deleteTodoController = async (req: IRequest, res: Response) => {
  const { todoId } = req.params;

  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(todoId);

    const subTasksToDelete = await SubTaskModel.find({
      todo: todoId,
      user: req.user.id,
    });

    if (deletedTodo) {
      await SubTaskModel.deleteMany({
        todo: todoId,
        user: req.user.id,
      });
    }

    const data = {
      todo: deletedTodo,
      subTasks: subTasksToDelete,
    };

    res.status(200).json({
      status: 'success',
      message: 'Todo deleted successfully',
      data,
    });
  } catch (error: any) {
    sendServerSideError(res, error.message);
  }
};
