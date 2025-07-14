import { GraphQLObjectType } from 'graphql';
import { GraphQLString, GraphQLFieldConfig } from 'graphql';
import { UserType } from '@/graphql/types/userType';
import { User } from '@/models/User';

// Define updateProfileMutation separately
const updateProfileMutation: GraphQLFieldConfig<any, any> = {
  type: UserType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { user } = context;

    if (!user) {
      throw new Error('Not authenticated');
    }

    const updatedUser = await User.findOneAndUpdate(
      { auth0Id: user.id },
      { $set: args },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  },
};

// Export RootMutation object
export const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    updateProfile: updateProfileMutation,
    // Add more mutations here as needed
  },
});
