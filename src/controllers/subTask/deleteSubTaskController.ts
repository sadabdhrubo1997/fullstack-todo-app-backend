import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';

import SubTaskModel from '../../models/subTaskModel';
import TodoModel from '../../models/todoModel';

import { sendServerSideError } from './../../utils/helper/sendServerSideError';

export const deleteSubTaskController = async (req: IRequest, res: Response) => {
  const { subTaskId } = req.params;

  console.log(req.temp.subTasks.isDone);
  try {
    const deletedSubTask: any = await SubTaskModel.findByIdAndDelete(
      subTaskId
    ).populate('todo');
    console.log(deletedSubTask);

    const updatedTodo = await TodoModel.findOneAndUpdate(
      { _id: deletedSubTask.todo._id },
      {
        $inc: {
          totalSubTasks: -1,
          doneSubTasks: deletedSubTask.isDone ? -1 : 0,
        },
      },
      { new: true }
    );


    res.status(200).json({
      status: 'success',
      message: 'sub task marked as done successfully',
      data: {
        subTask: deletedSubTask,
        todo: updatedTodo,
      },
    });
  } catch (error: any) {
    sendServerSideError(res, error.message);
  }
};
