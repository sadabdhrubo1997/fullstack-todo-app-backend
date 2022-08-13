import { NextFunction, Response } from 'express';
import { IRequest } from '../constants/interfaces';
import { sendServerSideError } from '../utils/helper/sendServerSideError';
import SubTaskModel from './../models/subTaskModel';

export const checkSubTaskExistsWithAuthorMiddleware = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { subTaskId } = req.params;

  // check for Todo Id through params
  if (!subTaskId) {
    return res.status(400).json({
      status: 'error',
      message: 'sub task Id through params is required.',
    });
  }

  try {
    // check if the sub task exists with id
    const existsSubTask = await SubTaskModel.findOne({
      _id: subTaskId,
      user: req.user.id,
    })
      .populate('todo')
      .populate('user')
      .lean();

    if (!existsSubTask) {
      return res.status(400).json({
        status: 'error',
        message:
          'Sub tasks does not exists or you do not have permission to access the sub task.',
      });
    }

    // check if the sub task wrapper todo exists with id
    if (!existsSubTask.todo) {
      return res.status(400).json({
        status: 'error',
        message: 'Sub Tasks wrapper todo does not exists .',
      });
    }

    // // check if the user authorized to access the sub task
    // if (!existsSubTask.user=== req.user.id) {
    //   return res.status(400).json({
    //     status: 'error',
    //     message:
    //       'You do not have permission to access the sub task.',
    //   });
    // }

    const tmp = {
      subTasks: existsSubTask,
    };

    req.temp = tmp;
    next();
  } catch (error: any) {
    return sendServerSideError(res, error.message);
  }
};
