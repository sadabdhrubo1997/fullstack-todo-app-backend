import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';
// import SubTaskModel from '../../models/subTaskModel';
import { sendServerSideError } from './../../utils/helper/sendServerSideError';

export const editSubTaskController = async (req: IRequest, res: Response) => {
  try {
    const isSubTaskExists = req.temp.subTasks;

    res.json({
      isSubTaskExists,
    });
  } catch (error: any) {
    sendServerSideError(res, error.message);
  }
};
