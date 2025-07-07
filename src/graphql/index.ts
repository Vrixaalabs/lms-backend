import { readFileSync } from 'fs';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers } from './resolvers/userResolvers';
import { playgroundResolvers } from './resolvers/playgroundResolvers';

// Read GraphQL type definitions
const userTypeDefs = readFileSync(
  join(__dirname, 'typeDefs', 'user.graphql'),
  'utf-8'
);
const playgroundTypeDefs = readFileSync(
  join(__dirname, 'typeDefs', 'playground.graphql'),
  'utf-8'
);

// Combine type definitions
const typeDefs = [userTypeDefs, playgroundTypeDefs];

// Merge resolvers using graphql-tools
const resolvers = mergeResolvers([userResolvers, playgroundResolvers]);

// Create executable schema
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

console.log('Schema created successfully');
