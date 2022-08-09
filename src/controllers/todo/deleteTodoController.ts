import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';
import SubTaskModel from '../../models/subTaskModel';
import { sendServerSideError } from '../../utils/helper/sendServerSideError';
import TodoModel from './../../models/todoModel';

export const deleteTodoController = async (req: IRequest, res: Response) => {
  const { todoId } = req.params;
  console.log(req.temp.todo);
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(todoId);

    let deletedSubTasks;

    const subTasksToDelete = await SubTaskModel.find({
      todo: todoId,
      user: req.user.id,
    });

    if (deletedTodo) {
      deletedSubTasks = await SubTaskModel.deleteMany({
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
      message: 'from delete todo controller',
      data,
    });
  } catch (error: any) {
    sendServerSideError(res, error.message);
  }
};
