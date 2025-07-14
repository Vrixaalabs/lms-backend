import { GraphQLError } from 'graphql';
import { DashboardService } from '../../services/DashboardService';

export const dashboardResolvers = {
  Query: {
    getDashboardStats: async (_: unknown, __: unknown, { user }: { user?: { id: string } }) => {
      if (!user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      try {
        const stats = await DashboardService.getUserStats(user.id);
        const recentActivities = await DashboardService.getRecent(user.id, 10);
        const recommendedCourses = await DashboardService.getRecommendations(user.id);

        return {
          ...stats,
          recentActivities,
          recommendedCourses,
        };
      } catch (err) {
        throw new GraphQLError('Failed to fetch dashboard stats', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', originalError: err },
        });
      }
    },
  },
};
