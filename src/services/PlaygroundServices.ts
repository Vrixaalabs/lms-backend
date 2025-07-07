import { PlaygroundFileModel } from '../models/PlaygroundFile';
import { codeWrapper } from '../utils/codeWrapper';
import { runCodeSafely } from '../utils/codeRunner';

export const PlaygroundService = {
  async execute(fileId: string, submitType: string) {
    console.log('PlaygroundService.execute called with fileId:', fileId);

    try {
      const file = await PlaygroundFileModel.findById(fileId);

      if (!file) {
        console.error('File not found.');
        return {
          stdout: '',
          stderr: 'Playground file not found',
          success: false,
          passedTestCases: 0,
          executionTime: 0
        };
      }

      if (!file.content || file.content.trim().length === 0) {
        console.error('Empty source file!');
        return {
          stdout: '',
          stderr: 'Empty source file!',
          success: false,
          passedTestCases: 0,
          executionTime: 0
        };
      }

      let wrappedCode: string;
      let expectedOutputs: string[];

      if (submitType === 'executeCode' || submitType === 'submitCode') {
        const result = await codeWrapper(file.language, file.content, file.problemId, submitType);
        wrappedCode = result.wrappedCode;
        expectedOutputs = result.expectedOutputs;
      } else {
        return {
          stdout: '',
          stderr: 'Invalid submitType. Must be "executeCode" or "submitCode".',
          success: false,
          passedTestCases: 0,
          executionTime: 0
        };
      }

      const result = await runCodeSafely(file.language, wrappedCode, expectedOutputs);

      return {
        stdout: result.stdout || '',
        stderr: result.stderr || '',
        success: Boolean(result.success),
        passedTestCases: result.passedTestCases || 0,
        executionTime: result.executionTime || 0
      };

    } catch (error: any) {
      console.error('Service error:', error);
      return {
        stdout: '',
        stderr: error?.message || 'Unknown service error',
        success: false,
        passedTestCases: 0,
        executionTime: 0
      };
    }
  }
};

export default PlaygroundService;
