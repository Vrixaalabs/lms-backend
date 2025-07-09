import { PlaygroundService } from '../../services/PlaygroundServices';
import { ProblemModel } from '../../models/Problem';
import { executeAndHandle } from '../../utils/submitHandler.ts';

export const playgroundResolvers = {
  Query: {
    problems: async () => {
      try {
        const problems = await ProblemModel.find({});
        if (!problems) return [];

        return problems.map(problem => ({
          id: problem._id?.toString() || problem.id,
          title: problem.title || '',
          description: problem.description || '',
          difficulty: problem.difficulty || '',
          testCases: problem.testCases || [],
          createdAt: problem.createdAt?.toISOString() || new Date().toISOString()
        }));
      } catch (error) {
        console.error('Error fetching problems:', error);
        return [];
      }
    }
  },

Mutation: {
  executeCode: async (_parent, { fileId }: { fileId: string }, context: { user: any }) => {
    return await executeAndHandle(fileId, 'executeCode', context.user);
  },

  submitCode: async (_parent, { fileId }: { fileId: string }, context: { user: any }) => {
    return await executeAndHandle(fileId, 'submitCode', context.user);
  }
}
};
