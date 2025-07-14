//import { UserActivityModel } from '../models/UserActivity';
import { IUserActivity, UserActivityModel } from '../models/UserActivity';
import { CourseModel } from '../models/Course';
// import CourseModel or other models if needed

export const DashboardService = {
  async getUserStats(userId: string) {
    // Aggregate total watch hours and material reads
    const result = await UserActivityModel.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalWatchHours: { $sum: '$watchTime' },
          totalMaterialReads: { $sum: '$materialReads' },
        },
      },
    ]);

    // Calculate growth rate: current 30 days vs previous 30 days
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const recentCount = await UserActivityModel.countDocuments({
      userId,
      timestamp: { $gte: thirtyDaysAgo },
    });

    const previousCount = await UserActivityModel.countDocuments({
      userId,
      timestamp: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo },
    });

    const growthRate =
    previousCount === 0
      ? recentCount > 0 ? 100 : 0 // Activity started from 0
      : ((recentCount - previousCount) / previousCount) * 100;
  

    return {
      totalWatchHours: result[0]?.totalWatchHours || 0,
      totalMaterialReads: result[0]?.totalMaterialReads || 0,
      growthRate,
    };
  },

  async getRecent(userId: string, limit: number) {
    const activities: IUserActivity[] = await UserActivityModel.find({ userId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .lean(); // this helps return plain JS objects

  return activities.map((activity) => ({
    id: String(activity._id),
    type: activity.watchTime > 0 ? 'Watched Video' : 'Read Material',
    timestamp: activity.createdAt.toISOString(),
  }));
  },

  async getRecommendations(userId: string) {
    // Fetch first 2 courses from DB (replace logic later)
    return await CourseModel.find().limit(10);
  }
};
/*import { UserActivityModel } from '../models/UserActivity';

export const DashboardService = {
  async getUserStats(userId: string) {
    // Aggregate user data
    const result = await UserActivityModel.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalWatchHours: { $sum: '$watchTime' },
          totalMaterialReads: { $sum: '$materialReads' },
          activityCount: { $sum: 1 }
        }
      }
    ]);

    const growthRate = Math.random() * 10 + 5; // Placeholder growth rate

    return {
      totalWatchHours: result[0]?.totalWatchHours || 0,
      totalMaterialReads: result[0]?.totalMaterialReads || 0,
      growthRate
    };
  },
  async getRecent(userId: string, limit: number) {
    // For now, return dummy recent activity data
    return [
      {
        id: 'a1',
        type: 'Watched Video',
        timestamp: new Date().toISOString()
      },
      {
        id: 'a2',
        type: 'Read Material',
        timestamp: new Date().toISOString()
      }
    ].slice(0, limit);
  },

  async getRecommendations(userId: string) {
    // Return mock recommended courses for now
    return [
      {
        id: 'c1',
        title: 'Introduction to TypeScript',
        description: 'Learn the basics of TypeScript.'
      },
      {
        id: 'c2',
        title: 'GraphQL for Beginners',
        description: 'Start using GraphQL to build APIs.'
      }
    ];
  }

};*/