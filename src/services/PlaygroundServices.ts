import { PlaygroundFileModel } from '../models/PlaygroundFile';
import { SubmittedCodeModel } from '../models/SubmittedFile';
import { codeWrapper } from '../utils/codeWrapper';
import { runCodeSafely } from '../utils/codeRunner';
import { errorHandler } from '../utils/errorHandler.ts';

export const PlaygroundService = {
  async execute(fileId: string, submitType: string, user: any) {
    console.log('PlaygroundService.execute called with fileId:', fileId);

    const userId = user.auth0Id;

    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const file = await PlaygroundFileModel.findById(fileId);

      if (!file) {
        return errorHandler('Playground file not found', userId); 
      }

      if (!file.content || file.content.trim().length === 0) {
        return errorHandler('Empty source file', userId); 
      }

      if (submitType !== 'executeCode' && submitType !== 'submitCode') {
        return errorHandler('Invalid submitType, must be executeCode() or submitCode()', userId); 
      }

      const { wrappedCode, expectedOutputs } = await codeWrapper(
        file.language,
        file.content,
        file.problemId,
        submitType
      );

      const result = await runCodeSafely(file.language, wrappedCode, expectedOutputs, userId);

      const response = {
        stdout: result.stdout || '',
        stderr: result.stderr || '',
        success: Boolean(result.success),
        passedTestCases: result.passedTestCases || 0,
        executionTime: result.executionTime || 0,
        owner: userId,
      };

      if (submitType === 'submitCode') {
        await SubmittedCodeModel.create({
          fileId,
          stdout: response.stdout,
          stderr: response.stderr,
          success: response.success,
          passedTestCases: response.passedTestCases,
          executionTime: response.executionTime,
          owner: userId,
        });
      }

      return response;
    } catch (error: any) {
      console.error('Service error:', error);
        return errorHandler('Unknown service error', userId); 
    }
  },
};

export default PlaygroundService;
