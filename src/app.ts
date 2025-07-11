import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { schema } from './graphql';
import { authMiddleware } from './middleware/authMiddleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const apolloServer = new ApolloServer({
  schema,
});

async function startApolloServer() {
  await apolloServer.start();

app.use(
  '/graphql',
  authMiddleware, 
  expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      console.log('GraphQL context.user:', req.user); 
      return { user: req.user || null };
    }
  })
);
}

startApolloServer().catch((error) => {
  console.error('❌ Apollo Server startup error:', error);
});

export { app };
