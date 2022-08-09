import { Response } from 'express';
import { IRequest } from '../../constants/interfaces';

export const moveToTrashTodoController = async (req: IRequest, res: Response) => {
  const { todoId } = req.params;
  try {
    console.log(todoId);
    res.status(200).json({
      status: 'success',
      message: 'todo moved to trash successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong',
    });
  }
};
