import { gql } from 'apollo-server-express';

export const courseTypeDefs = gql`
  enum Difficulty {
    BEGINNER
    INTERMEDIATE
    ADVANCED
  }

  enum CourseSortField {
    RATING
    PRICE
    DURATION
    TITLE
  }

  enum SortDirection {
    ASC
    DESC
  }

  input PriceRangeInput {
    min: Float!
    max: Float!
  }

  input CourseFilterInput {
    searchTerm: String
    categories: [ID!]
    difficulty: [Difficulty!]
    priceRange: PriceRangeInput
    rating: Float
    instructorIds: [ID!]
  }

  input CourseSortInput {
    field: CourseSortField!
    direction: SortDirection!
  }

  input PaginationInput {
    page: Int
    limit: Int
  }

  type Course {
    id: ID!
    title: String!
    description: String
    difficulty: Difficulty!
    price: Float!
    rating: Float!
    duration: Float!
    categories: [String!]
    instructor: Instructor!
  }

  type Instructor {
    id: ID!
    name: String!
    bio: String
    avatar: String
  }

  type CourseEdge {
    node: Course!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: Int!
    endCursor: Int!
  }

  type CourseConnection {
    edges: [CourseEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type Query {
    searchCourses(
      filter: CourseFilterInput
      sort: CourseSortInput
      pagination: PaginationInput
    ): CourseConnection!
  }
`;
