import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLEnumType,
  GraphQLList,
} from 'graphql';

export const UserRoleEnum = new GraphQLEnumType({
  name: 'UserRole',
  values: {
    STUDENT: { value: 'STUDENT' },
    INSTRUCTOR: { value: 'INSTRUCTOR' },
    ADMIN: { value: 'ADMIN' },
  },
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    role: { type: new GraphQLNonNull(UserRoleEnum) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
