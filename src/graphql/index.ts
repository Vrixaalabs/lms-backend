import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLString } from 'graphql';
import { userResolvers } from './resolvers/userResolvers';
import { playgroundResolvers } from './resolvers/playgroundResolvers';
import { UserType, UserRoleEnum } from './typeDefs/user.types';
import { ProblemType, ExecutionResultType } from './typeDefs/playground.types';

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    // User queries
    me: {
      type: UserType,
      resolve: userResolvers.Query.me,
    },
    users: {
      type: new GraphQLList(new GraphQLNonNull(UserType)),
      resolve: userResolvers.Query.users,
    },

    // Playground queries
    problems: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProblemType))),
      resolve: playgroundResolvers.Query.problems,
    },
  },
});

// Root Mutation
const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateProfile: {
      type: new GraphQLNonNull(UserType),
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
      },
      resolve: userResolvers.Mutation.updateProfile,
    },

    executeCode: {
      type: new GraphQLNonNull(ExecutionResultType),
      args: {
        fileId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: playgroundResolvers.Mutation.executeCode,
    },

    submitCode: {
      type: new GraphQLNonNull(ExecutionResultType),
      args: {
        fileId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: playgroundResolvers.Mutation.submitCode,
    },
  },
});

// Export final executable schema
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

console.log('✅ Code-first schema created successfully');
