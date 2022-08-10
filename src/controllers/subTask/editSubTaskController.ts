import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';
// import SubTaskModel from '../../models/subTaskModel';
import { sendServerSideError } from './../../utils/helper/sendServerSideError';
import SubTaskModel from './../../models/subTaskModel';

export const editSubTaskController = async (req: IRequest, res: Response) => {
  const { title, description } = req.body;
  const { subTasks: prevSubTasks } = req.temp;
  const { subTaskId } = req.params;

  if (prevSubTasks.title == title && prevSubTasks.description == description) {
    return res.status(400).json({
      status: 'error',
      message:
        'Sub task title or description mush have to be new. You are giving current title and description.',
    });
  }

  try {
    const editedSubTask = await SubTaskModel.findByIdAndUpdate(
      subTaskId,
      {
        title,
        description,
        isDone: false,
      },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'Sub task edited successfully',
      data: editedSubTask,
    });
  } catch (error: any) {
    sendServerSideError(res, error.message);
  }
};
