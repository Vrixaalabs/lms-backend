import { ProblemModel } from '../models/Problem.ts';

export const codeWrapper = async (language: string, code: string, problemId: string, submitType: string ): Promise<{ wrappedCode: string; expectedOutputs: string[] }> => {
  const problem = await ProblemModel.findById(problemId);

  if (!problem) {
    throw new Error(`No problem found for problemId: ${problemId}`);
  }

  const testCases =
    submitType === 'submitCode'
      ? problem.testCases
      : problem.testCases.filter(tc => !tc.isHidden);

  const testInputs = testCases.map(tc => tc.input);
  const expectedOutputs = testCases.map(tc => tc.expectedOutput);

  const functionName = problem.functionSignature?.name || 'solve';

  let wrappedCode = '';

  if (language === 'python') {
    wrappedCode = `
${code}

import json

inputs = ${JSON.stringify(testInputs)}
for i in inputs:
  args = json.loads(i)
  print(${functionName}(*args))
`;
  } else if (language === 'javascript') {
    wrappedCode = `
${code}

const inputs = ${JSON.stringify(testInputs)};
for (let i of inputs) {
  const args = JSON.parse(i);
  console.log(${functionName}(...args));
}
`;
  } else {
    throw new Error('Unsupported language');
  }

  return { wrappedCode, expectedOutputs };
};
