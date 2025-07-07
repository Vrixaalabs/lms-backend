import { PlaygroundService } from '../../services/PlaygroundServices';
import { ProblemModel } from '../../models/Problem';

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
      
      try {
        if (!fileId) {
          console.error('No fileId provided');
          return {
            stdout: '',
            stderr: 'No fileId provided',
            success: false,
            passedTestCases: 0,
            executionTime: 0
          };
        }

        const result = await PlaygroundService.execute(fileId);
        
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
        
        const transformedResult = {
          stdout: result.stdout || '',
          stderr: result.stderr || '',
          success: Boolean(result.success),
          passedTestCases: result.passedTestCases || 0,
          executionTime: result.executionTime || 0
        };
        
        return transformedResult;
        
      } catch (err: any) {
        console.error('Error in executeCode resolver:', err);
        
        const errorResult = {
          stdout: '',
          stderr: err?.message || 'Unknown error occurred',
          success: false,
          passedTestCases: 0,
          executionTime: 0
        };
        
        console.log('Returning error result:', errorResult);
        return errorResult;
      }
    }
  }
};
