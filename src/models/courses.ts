import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  price: number;
  rating: number;
  duration: number;
  categories: string[];
  instructor: mongoose.Types.ObjectId;
}

const courseSchema = new Schema<ICourse>({
  title: String,
  description: String,
  difficulty: {
    type: String,
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
  },
  price: Number,
  rating: Number,
  duration: Number,
  categories: [String],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
  },
}, { timestamps: true });

const CourseModel = mongoose.model<ICourse>('Course', courseSchema);
export { CourseModel };