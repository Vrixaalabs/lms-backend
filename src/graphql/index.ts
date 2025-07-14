/*This file builds GraphQL schema for Apollo Server by:

Loading all .graphql files from typedefs/

Merging all resolvers

Exporting the final schema object */

//import { readFileSync } from 'fs';
import { GraphQLSchema } from 'graphql';
import { RootQuery } from '@/graphql/types/rootQuery';
import { RootMutation } from '@/graphql/types/rootMutation';

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
