import { PlaygroundService } from '../../services/PlaygroundServices';
import { ProblemModel } from '../../models/Problem';
import { submitHandler } from '../../utils/submitHandler.ts';
import { SubmittedCodeModel } from '../../models/SubmittedFile.ts';

export const playgroundResolvers = {
  Query: {
    problems: async () => {
      try {
        const problems = await ProblemModel.find({});
        
        if (!problems) {
          return [];
        }
        
        const transformedProblems = problems.map(problem => ({
          id: problem._id?.toString() || problem.id,
          title: problem.title || '',
          description: problem.description || '',
          difficulty: problem.difficulty || '',
          testCases: problem.testCases || [],
          createdAt: problem.createdAt?.toISOString() || new Date().toISOString()
        }));
        
        return transformedProblems;
      } catch (error) {
        console.error('Error fetching problems:', error);
        return [];
      }
    }
  },

  Mutation: {
    executeCode: async (_: any, { fileId }: { fileId: string }) => {
      if(submitHandler(fileId)){ 
        const result = await PlaygroundService.execute(fileId, 'executeCode');
        
        if (!result) {
          console.error('Service returned null/undefined');
          return {
            stdout: '',
            stderr: 'Service returned no result',
            success: false,
            passedTestCases: 0,
            executionTime: 0
          };
        }

        return result;
      }
        return {
          stdout: '',
          stderr: 'Invalid file ID or unauthorized access',
          success: false,
          passedTestCases: 0,
          executionTime: 0
        };
    },


    submitCode: async (_: any, { fileId }: { fileId: string }) => {
      if(submitHandler(fileId)){ 
        const result = await PlaygroundService.execute(fileId, 'submitCode');
        
        if (!result) {
          console.error('Service returned null/undefined');
          return {
            stdout: '',
            stderr: 'Service returned no result',
            success: false,
            passedTestCases: 0,
            executionTime: 0
          };
        }
      try {
        await SubmittedCodeModel.create({
          fileId,
          stdout: result.stdout,
          stderr: result.stderr,
          success: result.success,
          passedTestCases: result.passedTestCases,
          executionTime: result.executionTime
        });
      } catch (dbError) {
        console.error('Failed to save submitted code:', dbError);
      }
        return result;
      }
      return {
        stdout: '',
        stderr: 'Invalid file ID or unauthorized access',
        success: false,
        passedTestCases: 0,
        executionTime: 0
      };
    }
  }
};
