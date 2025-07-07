import { readFileSync } from 'fs';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { userResolvers } from './resolvers/userResolvers';
import { analyticsResolvers } from './resolvers/analyticsResolvers';

// Read GraphQL type definitions
const userTypeDefs = readFileSync(
  join(__dirname, 'typeDefs', 'user.graphql'),
  'utf-8'
);

const analyticsTypeDefs = readFileSync(
  join(__dirname, 'typeDefs', 'analytics.graphql'),
  'utf-8'
);

// Combine all type definitions
const typeDefs = [userTypeDefs, analyticsTypeDefs];

// Combine all resolvers
const resolvers = [userResolvers, analyticsResolvers];

// Create executable schema
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
}); 