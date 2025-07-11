import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { courseResolvers } from './graphql/resolvers/courseResolvers';
import * as courseTypes from './graphql/typeDefs/course.types';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import app from './app';
import connectDB from './config/db';

 
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    searchCourses: {
      type: courseTypes.CourseConnectionType,
      args: {
        filter: { type: courseTypes.CourseFilterInput },
        sort: { type: courseTypes.CourseSortInput },
        pagination: { type: courseTypes.PaginationInput },
      },
      resolve: courseResolvers.Query.searchCourses,
    },
  },
});

const schema = new GraphQLSchema({
  query: QueryType,
});

const server = new ApolloServer({
  schema,
});

const startServer = async () => {
  await connectDB();
  await server.start();
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      return { user: { id: 'test-user-id' } };
    },
  }));
  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
};

startServer(); 