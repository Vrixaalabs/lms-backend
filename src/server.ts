import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { courseTypeDefs } from './graphql/typeDefs/courseTypeDefs';
import { courseResolvers } from './graphql/resolvers/courseResolvers';
import app from './app';
import connectDB from './config/db';

const server = new ApolloServer({
  typeDefs: courseTypeDefs,
  resolvers: courseResolvers,
});

const startServer = async () => {
  await connectDB();
  await server.start();
  
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      return { user: { id: 'test-user-id' } };  
    },
  }));
  
  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
};

startServer(); 