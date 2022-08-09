import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';
import { sendServerSideError } from '../../utils/helper/sendServerSideError';
import SubTaskModel from './../../models/subTaskModel';

export const getAllSubTasksController = async (
  req: IRequest,
  res: Response
) => {
  try {
    const subTasks = await SubTaskModel.find({ todo: req.temp.todo._id });
    res.json(subTasks);
  } catch (error: any) {
    sendServerSideError(res, error.message);
  }
};
