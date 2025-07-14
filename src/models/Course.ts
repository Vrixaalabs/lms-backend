import { Schema, model, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description?: string;
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String },
});

export const CourseModel = model<ICourse>('Course', courseSchema);
