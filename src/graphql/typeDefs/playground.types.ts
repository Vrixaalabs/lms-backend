import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

export const ExecutionResultType = new GraphQLObjectType({
  name: 'ExecutionResult',
  fields: () => ({
    stdout: { type: GraphQLString },
    stderr: { type: GraphQLString },
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
    passedTestCases: { type: new GraphQLNonNull(GraphQLInt) },
    executionTime: { type: GraphQLInt },
    owner: { type: GraphQLString },
  }),
});

export const ProblemType = new GraphQLObjectType({
  name: 'Problem',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    difficulty: { type: GraphQLString },
    testCases: { type: new GraphQLList(GraphQLInt) },
    createdAt: { type: GraphQLString },
  }),
});
