import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';
import SubTaskModel from '../../models/subTaskModel';
import TodoModel from '../../models/todoModel';
import { sendServerSideError } from './../../utils/helper/sendServerSideError';

export const subTaskMarkDoneController = async (
  req: IRequest,
  res: Response
) => {
  const { subTaskId } = req.params;

  try {
    // update the sub tasks document
    let updatedSubTask = await SubTaskModel.findByIdAndUpdate(
      subTaskId,
      {
        isDone: true,
      },
      { new: true }
    );


    const updatedTodo = await TodoModel.findOneAndUpdate(
      { _id: req.temp.subTasks.todo._id },
      { $inc: { doneSubTasks: 1 } },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'sub task marked as done successfully',
      data: {
        subTask: updatedSubTask,
        todo: updatedTodo,
      },
    });

  } catch (error: any) {
    sendServerSideError(res, error.message);
  }
};
