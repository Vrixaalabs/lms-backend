import { ProblemModel } from '../models/Problem.ts';

export const codeWrapper = async ( language: string, code: string, problemId: string, submitType: string ): Promise<{ wrappedCode: string; expectedOutputs: string[] }> => {
  const problem = await ProblemModel.findById(problemId);

  if (!problem) {
    throw new Error(`No problem found for problemId: ${problemId}`);
  }

  // Determine test cases based on submitType
  const testCases =
    submitType === 'submitCode'
      ? problem.testCases
      : problem.testCases.filter(tc => !tc.isHidden);

  const testInputs = testCases.map(tc => tc.input);
  const expectedOutputs = testCases.map(tc => tc.expectedOutput);

  let wrappedCode = '';

  if (language === 'python') {
    wrappedCode = `
${code}

inputs = ${JSON.stringify(testInputs)}
for i in inputs:
  n = int(i)
  print(solve(n))
`;
  } else if (language === 'javascript') {
    wrappedCode = `
${code}

const inputs = ${JSON.stringify(testInputs)};
for (let i of inputs) {
  const n = parseInt(i);
  console.log(solve(n));
}
`;

  } else {
    throw new Error('Unsupported language');
  }

  return { wrappedCode, expectedOutputs };
};
