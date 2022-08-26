import { Schema, model, Document, Model } from 'mongoose';

interface ISubTaskModel extends Document {
  title: string;
  description: string;
  todo: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  isDone: boolean;
  updatedAt: Date;
  createdAt: Date;
}

const SubTaskSchema = new Schema<ISubTaskModel>(
  {
    title: {
      type: String,
      require: true,
      maxlength: [100, 'Title can not be more then 100 characters'],
    },
    description: {
      type: String,
      require: true,
      maxlength: [1000, 'Description can not be more then 1000 characters'],
    },
    todo: {
      type: Schema.Types.ObjectId,
      ref: 'Todo',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SubTaskModel: Model<ISubTaskModel> = model<ISubTaskModel>(
  'SubTask',
  SubTaskSchema
);

export default SubTaskModel;
