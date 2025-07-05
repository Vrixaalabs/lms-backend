import { GraphQLError } from 'graphql';
import { CourseService } from '../services/courseService';

export const courseResolvers = {
  Query: {
    searchCourses: async (_: any, { filter, sort, pagination }: any, { user }: any) => {
      if (!user) throw new GraphQLError('Not authenticated', {
        extensions: { code: 'UNAUTHENTICATED' }
      });
      return await CourseService.search(filter, sort, pagination);
    },
  },
};

