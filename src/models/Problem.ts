import { Schema, model, Document } from 'mongoose';

interface TestCase {
  input: string; // JSON stringified array of arguments, e.g. "[2]" or "[3, 5]"
  expectedOutput: string;
  isHidden: boolean;
}

interface FunctionParameter {
  name: string;  // e.g., "n", "arr"
  type: string;  // e.g., "int", "List[int]", "str"
}

interface FunctionSignature {
  name: string;  // e.g., "solve"
  parameters: FunctionParameter[];
}

export interface IProblem extends Document {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  tags: string[];
  testCases: TestCase[];
  functionSignature?: FunctionSignature;
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

const functionParameterSchema = new Schema<FunctionParameter>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }
  },
  { _id: false }
);

const functionSignatureSchema = new Schema<FunctionSignature>(
  {
    name: { type: String, required: true },
    parameters: { type: [functionParameterSchema], required: true }
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
    testCases: { type: [testCaseSchema], default: [] },
    functionSignature: { type: functionSignatureSchema, required: false }
  },
  { timestamps: true }
);

export const ProblemModel = model<IProblem>('Problem', problemSchema);
