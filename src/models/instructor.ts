import mongoose, { Document, Schema } from 'mongoose';

export interface IInstructor extends Document {
  name: string;
  bio: string;
  avatar: string;
}

const instructorSchema = new Schema<IInstructor>({
  name: String,
  bio: String,
  avatar: String,
});

const InstructorModel = mongoose.model<IInstructor>('Instructor', instructorSchema);
export { InstructorModel };

