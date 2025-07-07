import { Schema, model, Document } from 'mongoose';

interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface IProblem extends Document {
  title: string;
  description: string;
  difficulty: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  tags: string[];
  testCases: TestCase[];
  createdAt: Date;
  updatedAt: Date;
}

const testCaseSchema = new Schema<TestCase>(
  {
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    isHidden: { type: Boolean, default: false }
  },
  { _id: false }
);

const problemSchema = new Schema<IProblem>(
  {
    title: { type: String, required: true },
    description: String,
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    inputFormat: { type: String, required: true },
    outputFormat: { type: String, required: true },
    constraints: String,
    tags: { type: [String], default: [] },
    testCases: { type: [testCaseSchema], default: [] }
  },
  { timestamps: true }
);

export const ProblemModel = model<IProblem>('Problem', problemSchema);
