export const errorHandler = (statement: string, userId: string) => {
  return {
    stdout: '',
    stderr: statement,
    success: false,
    passedTestCases: 0,
    executionTime: 0,
    owner: userId,
  };
}
