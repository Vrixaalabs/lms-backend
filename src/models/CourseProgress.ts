import mongoose, { Schema, Document } from 'mongoose';

export interface ICourseProgress extends Document {
  userId: string;
  status: string;
}

const CourseProgressSchema = new Schema<ICourseProgress>({
  userId: { type: String, required: true },
  status: { type: String, required: true },
});

export const CourseProgressModel = mongoose.model<ICourseProgress>('CourseProgress', CourseProgressSchema); 