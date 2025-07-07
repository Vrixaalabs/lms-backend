import { PlaygroundFileModel } from '../models/PlaygroundFile';
import { codeWrapper } from '../utils/codeWrapper';
import { runCodeSafely } from '../utils/codeRunner';
import { SubmittedCodeModel } from '../models/SubmittedCode';

export const PlaygroundService = {
  async execute(fileId) {
    console.log('PlaygroundService.execute called with fileId:', fileId);
    
    try {
      const file = await PlaygroundFileModel.findById(fileId);
      
      if (!file) {
        console.error('File not found.');
        return {
          stdout: null,
          stderr: 'Playground file not found',
          success: false,
          passedTestCases: 0,
          executionTime: 0
        };
      }

      if (!file.content || file.content.trim().length === 0) {
        throw new Error('Empty source file!');
      }

      // Wrap user code
      const { wrappedCode, expectedOutputs } = await codeWrapper(
        file.language,
        file.content,
        file.problemId
      );

      //  Run wrapped code
      const result = await runCodeSafely(file.language, wrappedCode, expectedOutputs);

      //  Save result to DB
      await SubmittedCodeModel.create({
        fileId: fileId,
        problemId: file.problemId,
        language: file.language,
        content: file.content,
        owner: 'shujan', // Replace with actual user id if available
        status: result.success ? 'Passed' : 'Failed',
        executionTime: result.executionTime
      });

      return result;

    } catch (error) {
      console.error('Service error:', error);
      return {
        stdout: null,
        stderr: error.message,
        success: false,
        passedTestCases: 0,
        executionTime: 0
      };
    }
  }
};

export default PlaygroundService;
