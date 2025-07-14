// Merges all resolvers
import { userResolvers } from './userResolvers';
import { dashboardResolvers } from './dashboardResolvers';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...dashboardResolvers.Query,
    // Add more like courseResolvers.Query as needed
  },
};
