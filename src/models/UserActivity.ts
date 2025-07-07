import mongoose, { Schema, Document } from 'mongoose';

export interface IUserActivity extends Document {
  userId: string;
  timestamp: Date;
  duration: number;
  category?: string;
}

const UserActivitySchema = new Schema<IUserActivity>({
  userId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  duration: { type: Number, required: true },
  category: { type: String },
});

export const UserActivityModel = mongoose.model<IUserActivity>('UserActivity', UserActivitySchema); 