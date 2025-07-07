import { AuthenticationError } from 'apollo-server-express';
import { AnalyticsService } from '../../services/AnalyticsService';

export const analyticsResolvers = {
  Query: {
    // @ts-ignore
    getAnalytics: async (_, { timeRange }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await AnalyticsService.getAnalyticsOverview(user.id, timeRange);
    },
    // @ts-ignore
    getDetailedProgress: async (_, { category, timeRange }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await AnalyticsService.getDetailedProgress(user.id, category, timeRange);
    }
  }
}; 