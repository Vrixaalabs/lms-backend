import { PlaygroundFileModel } from '../models/PlaygroundFile';
import { codeWrapper } from '../utils/codeWrapper';
import { runCodeSafely } from '../utils/codeRunner';

export const PlaygroundService = {
  async execute(fileId: string) {
    console.log('PlaygroundService.execute called with fileId:', fileId);
    
    try {
      const file = await PlaygroundFileModel.findById(fileId);
      
      if (!file) {
        console.error('File not found.');
        return {
          stdout: '', // Changed from null to empty string
          stderr: 'Playground file not found',
          success: false,
          passedTestCases: 0,
          executionTime: 0
        };
      }
      
      if (!file.content || file.content.trim().length === 0) {
        console.error('Empty source file!');
        return {
          stdout: '', // Changed from null to empty string
          stderr: 'Empty source file!',
          success: false,
          passedTestCases: 0,
          executionTime: 0
        };
      }
      
      // Wrap user code
      const { wrappedCode, expectedOutputs } = await codeWrapper(
        file.language,
        file.content,
        file.problemId
      );
      
      // Run wrapped code
      const result = await runCodeSafely(file.language, wrappedCode, expectedOutputs);
      
      // Ensure result is not null and has required fields
      const finalResult = {
        stdout: result.stdout || '',
        stderr: result.stderr || '',
        success: Boolean(result.success),
        passedTestCases: result.passedTestCases || 0,
        executionTime: result.executionTime || 0
      };
      
      console.log('Service returning result:', finalResult);
      return finalResult;
      
    } catch (error: any) {
      console.error('Service error:', error);
      return {
        stdout: '', // Changed from null to empty string
        stderr: error?.message || 'Unknown service error',
        success: false,
        passedTestCases: 0,
        executionTime: 0
      };
    }
  }
};

export default PlaygroundService;
