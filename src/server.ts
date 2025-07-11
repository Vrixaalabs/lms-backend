import { app } from './app';
import { config } from './config/env';
import { connectDB } from './config/db';
import { logger } from './utils/logger';

const PORT = config.PORT || 4000;

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start the server
    app.listen(PORT, () => {
      logger.info(`🚀 Server is running on http://localhost:${PORT}`);
      logger.info(`🚀 GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 
