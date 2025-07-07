import mongoose, { Schema, Document } from 'mongoose';

export interface ITestResult extends Document {
  userId: string;
  completedAt: Date;
  score: number;
}

const TestResultSchema = new Schema<ITestResult>({
  userId: { type: String, required: true },
  completedAt: { type: Date, required: true },
  score: { type: Number, required: true },
});

export const TestResultModel = mongoose.model<ITestResult>('TestResult', TestResultSchema); 