import mongoose, { Document, Schema } from 'mongoose';

// Match the code-first GraphQL CourseType
declare type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface ICourse extends Document {
  title: string;
  description?: string;
  difficulty: Difficulty;
  price: number;
  rating: number;
  duration: number;
  categories: string[];
  instructor: mongoose.Types.ObjectId;
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String },
  difficulty: {
    type: String,
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
    required: true,
  },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  duration: { type: Number, required: true },
  categories: { type: [String], required: true },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true,
  },
}, { timestamps: true });

const CourseModel = mongoose.model<ICourse>('Course', courseSchema);
export { CourseModel };