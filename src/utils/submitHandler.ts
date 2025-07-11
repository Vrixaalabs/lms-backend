import { PlaygroundService } from '../services/PlaygroundServices.ts';
import { SubmittedCodeModel } from '../models/SubmittedFile.ts';
import { errorHandler } from '../utils/errorHandler.ts';

export const submitHandler = async (fileId: string) => {
  try {
    if (!fileId) {
      return errorHandler('No fileId match found', userId); 
    }
    return true;
  } catch (err: any) {
    console.error('Error in submitHandler:', err);
      return errorHandler('Unknown error occured', userId); 
  }
};

export const executeAndHandle = async (
  fileId: string,
  action: 'executeCode' | 'submitCode',
  user: any
) => {
  const isValid = await submitHandler(fileId);

  if (isValid !== true) return isValid;

  const result = await PlaygroundService.execute(fileId, action, user);

  if (!result) {
    return errorHandler('Service returned no result', userId); 
  }

  if (action === 'submitCode') {
    try {
      await SubmittedCodeModel.create({
        fileId,
        stdout: result.stdout,
        stderr: result.stderr,
        success: result.success,
        passedTestCases: result.passedTestCases,
        executionTime: result.executionTime,
        owner: user.auth0Id
      });
    } catch (dbError) {
      console.error('Failed to save submitted code:', dbError);
    }
  }

  return result;
};
