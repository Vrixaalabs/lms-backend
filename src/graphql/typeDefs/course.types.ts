import {
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql';

 
export const DifficultyEnum = new GraphQLEnumType({
  name: 'Difficulty',
  values: {
    BEGINNER: { value: 'BEGINNER' },
    INTERMEDIATE: { value: 'INTERMEDIATE' },
    ADVANCED: { value: 'ADVANCED' },
  },
});

export const CourseSortFieldEnum = new GraphQLEnumType({
  name: 'CourseSortField',
  values: {
    RATING: { value: 'RATING' },
    PRICE: { value: 'PRICE' },
    DURATION: { value: 'DURATION' },
    TITLE: { value: 'TITLE' },
  },
});

export const SortDirectionEnum = new GraphQLEnumType({
  name: 'SortDirection',
  values: {
    ASC: { value: 'ASC' },
    DESC: { value: 'DESC' },
  },
});

 
export const PriceRangeInput = new GraphQLInputObjectType({
  name: 'PriceRangeInput',
  fields: () => ({
    min: { type: new GraphQLNonNull(GraphQLFloat) },
    max: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

export const CourseFilterInput = new GraphQLInputObjectType({
  name: 'CourseFilterInput',
  fields: () => ({
    searchTerm: { type: GraphQLString },
    categories: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
    difficulty: { type: new GraphQLList(new GraphQLNonNull(DifficultyEnum)) },
    priceRange: { type: PriceRangeInput },
    rating: { type: GraphQLFloat },
    instructorIds: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
  }),
});

export const CourseSortInput = new GraphQLInputObjectType({
  name: 'CourseSortInput',
  fields: () => ({
    field: { type: new GraphQLNonNull(CourseSortFieldEnum) },
    direction: { type: new GraphQLNonNull(SortDirectionEnum) },
  }),
});

export const PaginationInput = new GraphQLInputObjectType({
  name: 'PaginationInput',
  fields: () => ({
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt },
  }),
});

 
export const InstructorType = new GraphQLObjectType({
  name: 'Instructor',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    bio: { type: GraphQLString },
    avatar: { type: GraphQLString },
  }),
});

export const CourseType = new GraphQLObjectType({
  name: 'Course',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    difficulty: { type: new GraphQLNonNull(DifficultyEnum) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    rating: { type: new GraphQLNonNull(GraphQLFloat) },
    duration: { type: new GraphQLNonNull(GraphQLFloat) },
    categories: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
    instructor: { type: new GraphQLNonNull(InstructorType) },
  }),
});

export const CourseEdgeType = new GraphQLObjectType({
  name: 'CourseEdge',
  fields: () => ({
    node: { type: new GraphQLNonNull(CourseType) },
  }),
});

export const PageInfoType = new GraphQLObjectType({
  name: 'PageInfo',
  fields: () => ({
    hasNextPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    hasPreviousPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    startCursor: { type: new GraphQLNonNull(GraphQLInt) },
    endCursor: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

export const CourseConnectionType = new GraphQLObjectType({
  name: 'CourseConnection',
  fields: () => ({
    edges: { type: new GraphQLList(new GraphQLNonNull(CourseEdgeType)) },
    pageInfo: { type: new GraphQLNonNull(PageInfoType) },
    totalCount: { type: new GraphQLNonNull(GraphQLInt) },
  }),
}); 