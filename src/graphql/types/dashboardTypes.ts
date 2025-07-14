import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID,
  } from 'graphql';
  
  // Activity Type
  export const ActivityType = new GraphQLObjectType({
    name: 'Activity',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      type: { type: new GraphQLNonNull(GraphQLString) },
      timestamp: { type: new GraphQLNonNull(GraphQLString) },
    },
  });
  
  // Course Type
  export const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
    },
  });
  
  // DashboardStats Type
  export const DashboardStatsType = new GraphQLObjectType({
    name: 'DashboardStats',
    fields: {
      totalWatchHours: { type: new GraphQLNonNull(GraphQLFloat) },
      totalMaterialReads: { type: new GraphQLNonNull(GraphQLFloat) },
      growthRate: { type: new GraphQLNonNull(GraphQLFloat) }, // ✅ Add this line
      recentActivities: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ActivityType))),
      },
      recommendedCourses: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(CourseType))),
      },
    },
  });
  