import { readFileSync } from 'fs';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { userResolvers } from './resolvers/userResolvers';
import { analyticsResolvers } from '../resolvers/analyticsResolvers';
import { DateTimeResolver } from 'graphql-scalars';
// Read GraphQL type definitions
const userTypeDefs = readFileSync(
  join(__dirname, 'typeDefs', 'user.graphql'),
  'utf-8'
);
const analyticsTypeDefs = readFileSync(
  join(__dirname, 'typeDefs', 'analytics.graphql'),
  'utf-8'
);
const typeDefs = [userTypeDefs, analyticsTypeDefs];
// Combine all resolvers
const resolvers = [userResolvers, analyticsResolvers,{ DateTime: DateTimeResolver }];

// Create executable schema
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
}); 