import { Schema, model, Document } from 'mongoose';

export interface IUserActivity extends Document {
  userId: string;
  watchTime: number;
  materialReads: number;
  createdAt: Date;
}

const userActivitySchema = new Schema<IUserActivity>(
  {
    userId: { type: String, required: true },
    watchTime: { type: Number, default: 0 },
    materialReads: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UserActivityModel = model<IUserActivity>('UserActivity', userActivitySchema);
