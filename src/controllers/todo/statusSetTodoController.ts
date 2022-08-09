import { Response, NextFunction } from 'express';
import { IRequest } from '../../constants/interfaces';
import TodoModel from '../../models/todoModel';
// import SubTaskModel from './../../models/subTaskModel';
import { getUserWIseSubTasks } from './../../utils/helper/getUserWIseSubTasks';

export const statusSetTodoController = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { todoId } = req.params;
  const { status } = req.body; // status could be 'new', 'ongoing', 'paused', 'done' only
  const prevStatus = req.temp.todo.status;

  if (
    !(
      status === 'new' ||
      status === 'ongoing' ||
      status === 'paused' ||
      status === 'done'
    )
  ) {
    return res.status(400).json({
      status: 'error',
      message: 'Todo status could be only new or ongoing or paused or done',
    });
  }

  if (status === prevStatus) {
    return res.status(400).json({
      status: 'error',
      message: `Todo status is already ${prevStatus}`,
    });
  }

  if (
    (prevStatus === 'new' && status === ('done' || 'paused')) ||
    (prevStatus === 'ongoing' && status === 'new') ||
    (prevStatus === 'paused' && status === 'new') ||
    prevStatus === 'done'
  ) {
    return res.status(400).json({
      status: 'error',
      message: `You can not set your todo status from '${prevStatus}' to '${status}'`,
    });
  }

  try {
    const createdTodo = await TodoModel.findByIdAndUpdate(
      todoId,
      {
        status,
      },
      { new: true }
    );

    const subTasks = await getUserWIseSubTasks({
      userId: req.user.id,
      todoId,
      next,
    });

    const data = {
      todo: createdTodo,
      subTasks,
    };

    res.status(200).json({
      message: 'updated successfully',
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong',
    });
  }
};
