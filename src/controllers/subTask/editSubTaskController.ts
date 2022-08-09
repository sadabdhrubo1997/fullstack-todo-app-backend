import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';
import { sendServerSideError } from './../../utils/helper/sendServerSideError';

export const editSubTaskController = async (req: IRequest, res: Response) => {
  const { subTaskId } = req.params;
  try {
    res.json({
      subTaskId,
    });
  } catch (error: any) {
    sendServerSideError(res, error.message);
  }
};
