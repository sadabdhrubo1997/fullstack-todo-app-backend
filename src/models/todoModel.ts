import { Schema, model, Document, Model } from 'mongoose';

interface ITodoModel extends Document {
  title: string;
  description: string;
  status: 'new' | 'ongoing' | 'paused' | 'done';
  user: Schema.Types.ObjectId;
  totalSubTasks: number;
  doneSubTasks: number;
  trash: boolean;
  updatedAt: Date;
  createdAt: Date;
}

const TodoSchema = new Schema<ITodoModel>(
  {
    title: {
      type: String,
      require: true,
      maxlength: [100, 'Title can not be more then 100 characters'],
    },
    description: {
      type: String,
      require: true,
      maxlength: [1000, 'Title can not be more then 1000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'ongoing', 'paused', 'done'],
      default: 'new',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalSubTasks: {
      type: Number,
      default: 0,
    },
    doneSubTasks: {
      type: Number,
      default: 0,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel: Model<ITodoModel> = model<ITodoModel>('Todo', TodoSchema);

export default TodoModel;
