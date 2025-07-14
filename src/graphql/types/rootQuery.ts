import { GraphQLObjectType } from 'graphql';
import { DashboardStatsType } from './dashboardTypes';
import { dashboardResolvers } from '../resolvers/dashboardResolvers';

export const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getDashboardStats: {
      type: DashboardStatsType,
      resolve: dashboardResolvers.Query.getDashboardStats,
    },
  },
});
