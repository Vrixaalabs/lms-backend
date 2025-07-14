//This file logs the mock data to the database
//To run this file, use: npm run seed
//bypass the auth0 middleware by commenting the authMiddleware in app.ts and uncommenting the mock user in app.ts

import mongoose from 'mongoose';
import { config } from '../config/env';
import { UserActivityModel } from '../models/UserActivity';
import { CourseModel } from '../models/Course'; // 👈 import the Course model

const MONGO_URI = config.MONGODB_URI || 'mongodb://localhost:27017/lms';

async function seedData() {
  await mongoose.connect(MONGO_URI);

  const mockUserId = 'user123';
  const now = new Date();

  // Seed User Activities
  const mockActivities = [
    {
      userId: mockUserId,
      watchTime: 120,
      materialReads: 0,
      createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
    },
    {
      userId: mockUserId,
      watchTime: 0,
      materialReads: 5,
      createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      userId: mockUserId,
      watchTime: 60,
      materialReads: 3,
      createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      userId: mockUserId,
      watchTime: 0,
      materialReads: 7,
      createdAt: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000), // 40 days ago (past 60-day window)
    },
    {
      userId: mockUserId,
      watchTime: 80,
      materialReads: 1,
      createdAt: new Date(now.getTime() - 50 * 24 * 60 * 60 * 1000), // 50 days ago (previous window)
    }
  ];

  await UserActivityModel.deleteMany({ userId: mockUserId });
  await UserActivityModel.insertMany(mockActivities);
  console.log('...Successfully Seeded mock user activity data');

  // Seed Courses
  const mockCourses = [
    {
      title: 'Introduction to TypeScript',
      description: 'Learn the basics of TypeScript.',
      tags: ['typescript', 'programming'],
    },
    {
      title: 'GraphQL for Beginners',
      description: 'Start using GraphQL to build APIs.',
      tags: ['graphql', 'api'],
    },
    {
      title: 'MongoDB Essentials',
      description: 'Master MongoDB for backend development.',
      tags: ['mongodb', 'database'],
    },
    {
      title: 'Apollo Server for GraphQL',
      description: 'Master Apollo Server for backend development.',
      tags: ['Apollo', 'Server'],
    },
    {
      title: 'Introduction to ESP32',
      description: 'Master ESP32 for IOT development.',
      tags: ['ESP32', 'IOT'],
    }
  ];

  await CourseModel.deleteMany({});
  await CourseModel.insertMany(mockCourses);
  console.log('...Successfully Seeded mock course data');

  mongoose.disconnect();
}

seedData().catch(console.error);
