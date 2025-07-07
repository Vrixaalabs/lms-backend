import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { schema } from './graphql';
import { authMiddleware } from './middleware/authMiddleware';

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Create Apollo Server
const apolloServer = new ApolloServer({
  schema,
  introspection: true, // Enable introspection for Apollo Sandbox
});

// Start Apollo Server
async function startApolloServer() {
  await apolloServer.start();
  
  // Apply Apollo middleware
  app.use(
    '/graphql',
    authMiddleware,
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({
        user: req.user, // Set by authMiddleware
      }),
    })
  );
}

startApolloServer().catch((error) => {
  console.error('Failed to start Apollo Server:', error);
});

export { app }; 