import { Schema, model, Document, Model } from 'mongoose';

interface IUserModel extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  updatedAt: Date;
  createdAt: Date;
}

const UserSchema = new Schema<IUserModel>(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: [20, 'First name can not be more than 50 characters'],
    },
    lastName: {
      type: String,
      required: true,
      maxlength: [20, 'Last name can not be more than 50 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: [50, 'Email can not be more than 50 characters'],
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    avatar: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<IUserModel> = model<IUserModel>('User', UserSchema);

export default UserModel;
