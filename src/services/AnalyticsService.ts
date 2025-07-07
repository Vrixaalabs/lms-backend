import { UserActivityModel } from '../models/UserActivity';
import { TestResultModel } from '../models/TestResult';
import { CourseProgressModel } from '../models/CourseProgress';

export const AnalyticsService = {
  // @ts-ignore
  async getAnalyticsOverview(userId, timeRange) {
    const activities = await UserActivityModel.aggregate([
      { $match: { userId, timestamp: { $gte: new Date(timeRange.start), $lte: new Date(timeRange.end) } } },
      {
        $group: {
          _id: null,
          totalLearningHours: { $sum: '$duration' },
          sessions: { $sum: 1 }
        }
      }
    ]);

    const scores = await TestResultModel.aggregate([
      { $match: { userId, completedAt: { $gte: new Date(timeRange.start), $lte: new Date(timeRange.end) } } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$score' }
        }
      }
    ]);

    const completedCourses = await CourseProgressModel.countDocuments({
      userId,
      status: 'COMPLETED'
    });

    return {
      overview: {
        totalLearningHours: activities[0]?.totalLearningHours || 0,
        completedCourses,
        averageScore: scores[0]?.avgScore || 0,
        activeStreak: 5, // mock or implement streak logic
        lastActive: new Date().toISOString(),
        totalCertificates: 2, // mock for now
        skillsAcquired: 7
      }
    };
  },

  // @ts-ignore
  async getDetailedProgress(userId, category, timeRange) {
    return await UserActivityModel.aggregate([
      {
        $match: {
          userId,
          ...(category && { category }),
          timestamp: {
            $gte: new Date(timeRange.start),
            $lte: new Date(timeRange.end)
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
          },
          hoursSpent: { $sum: "$duration" },
          activitiesCompleted: { $sum: 1 }
        }
      },
      {
        $project: {
          date: "$_id",
          hoursSpent: 1,
          activitiesCompleted: 1,
          efficiency: { $divide: ["$activitiesCompleted", "$hoursSpent"] }
        }
      },
      { $sort: { date: 1 } }
    ]);
  }
}; 