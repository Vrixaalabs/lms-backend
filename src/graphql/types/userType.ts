import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    auth0Id: { type: GraphQLString }, // if you use it
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },   // optional, add if needed
    // Add more fields as per your schema
  }),
});
