import { Schema, model, Document } from 'mongoose';

export interface IPlaygroundFile extends Document {
  problemId: string;
  language: string;
  content: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}

const playgroundFileSchema = new Schema<IPlaygroundFile>(
  {
    problemId: {
      type: String,
      required: true
    },
    language: {
      type: String,
      enum: ['python', 'javascript'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const PlaygroundFileModel = model<IPlaygroundFile>('PlaygroundFile', playgroundFileSchema);
