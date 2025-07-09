import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmittedCode extends Document {
  fileId: string;
  stdout: string;
  stderr: string;
  success: boolean;
  passedTestCases: number;
  executionTime: number;
  owner: string;
  submittedAt: Date;
}

const SubmittedCodeSchema: Schema = new Schema({
  fileId: { type: String, required: true },
  stdout: { type: String },
  stderr: { type: String },
  success: { type: Boolean, required: true },
  passedTestCases: { type: Number },
  executionTime: { type: Number },
  owner: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export const SubmittedCodeModel = mongoose.model<ISubmittedCode>('SubmittedCode', SubmittedCodeSchema);
