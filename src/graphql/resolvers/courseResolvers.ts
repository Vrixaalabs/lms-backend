import { GraphQLError } from 'graphql';
import { CourseService } from '../services/courseService';
import {
  CourseConnectionType,
  CourseFilterInput,
  CourseSortInput,
  PaginationInput
} from '../typeDefs/course.types';

// Modular error handler
function handleGraphQLError(error: any, code: string = 'INTERNAL_SERVER_ERROR') {
  if (error instanceof GraphQLError) return error;
  return new GraphQLError(
    typeof error === 'string' ? error : error.message || 'Unknown error',
    { extensions: { code } }
  );
}

export const courseResolvers = {
  Query: {
    searchCourses: async (
      _parent: any,
      args: { filter: typeof CourseFilterInput; sort: typeof CourseSortInput; pagination: typeof PaginationInput },
      context: { user?: any }
    ) => {
      try {
        if (!context.user) throw handleGraphQLError('Not authenticated', 'UNAUTHENTICATED');
        return await CourseService.search(args.filter, args.sort, args.pagination);
      } catch (err) {
        throw handleGraphQLError(err);
      }
    },
  },
};

