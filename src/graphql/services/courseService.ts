import { CourseModel } from '../../models/courses';
import mongoose, { PipelineStage } from 'mongoose';

export const CourseService = {
  async search(filter = {}, sort = {}, pagination = {}) {
    const matchStage: Record<string, any> = {};

    if ((filter as any).searchTerm) {
      const regex = { $regex: (filter as any).searchTerm, $options: 'i' };
      matchStage.$or = [
        { title: regex },
        { description: regex },
        { 'instructor.name': regex },
        { categories: regex },
      ];
    }

    if ((filter as any).difficulty?.length) {
      matchStage.difficulty = { $in: (filter as any).difficulty };
    }

    if ((filter as any).priceRange) {
      matchStage.price = {
        $gte: (filter as any).priceRange.min,
        $lte: (filter as any).priceRange.max,
      };
    }

    if ((filter as any).rating) {
      matchStage.rating = { $gte: (filter as any).rating };
    }

    if ((filter as any).instructorIds?.length) {
      matchStage.instructor = {
        $in: (filter as any).instructorIds.map(
          (id: string) => new mongoose.Types.ObjectId(id)
        ),
      };
    }

    const sortFieldMap: Record<string, string> = {
      RATING: 'rating',
      PRICE: 'price',
      DURATION: 'duration',
      TITLE: 'title',
    };

    const sortField = sortFieldMap[(sort as any).field || 'RATING'];
    const sortDir = (sort as any).direction === 'ASC' ? 1 : -1;

    const limit = (pagination as any).limit || 10;
    const skip = ((pagination as any).page - 1) * limit || 0;

    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'instructors',
          localField: 'instructor',
          foreignField: '_id',
          as: 'instructor',
        },
      },
      {
        $unwind: {
          path: '$instructor',
          preserveNullAndEmptyArrays: false,
        },
      },
      { $match: matchStage },
      { $sort: { [sortField]: sortDir } },
      {
        $facet: {
          paginatedResults: [
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [{ $count: 'count' }],
        },
      },
    ];

    const result = await CourseModel.aggregate(pipeline);
    const courses = result[0]?.paginatedResults || [];
    const total = result[0]?.totalCount?.[0]?.count || 0;

    return {
      edges: courses.map((course: any) => ({
        node: {
          ...course,
          id: course._id.toString(),
          _id: undefined,
          instructor: {
            ...course.instructor,
            id: course.instructor._id.toString(),
            _id: undefined,
          },
        },
      })),
      pageInfo: {
        hasNextPage: skip + courses.length < total,
        hasPreviousPage: skip > 0,
        startCursor: skip,
        endCursor: skip + courses.length - 1,
      },
      totalCount: total,
    };
  },
};
