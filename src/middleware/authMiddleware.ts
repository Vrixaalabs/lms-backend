import { Request, Response, NextFunction } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { config } from '../config/env';
import { logger } from '../utils/logger';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string;
        permissions?: string[];
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Allow introspection queries for Apollo Sandbox
  if (req.body && req.body.query && (
    req.body.query.includes('__schema') || 
    req.body.query.includes('__type') ||
    req.body.query.includes('IntrospectionQuery')
  )) {
    logger.info('Allowing introspection query for Apollo Sandbox');
    return next();
  }

  // Development mode: bypass authentication completely
  if (config.NODE_ENV === 'development') {
    logger.info('Development mode: bypassing authentication');
    req.user = {
      sub: 'dev-user-123',
      permissions: ['read:analytics', 'write:analytics']
    };
    return next();
  }

  // Production mode: use Auth0 authentication only if properly configured
  if (!config.AUTH0_DOMAIN || !config.AUTH0_AUDIENCE || 
      config.AUTH0_DOMAIN === '' || config.AUTH0_AUDIENCE === '') {
    logger.error('Auth0 configuration missing for production');
    return res.status(500).json({ message: 'Auth0 configuration missing' });
  }

  // Configure Auth0 middleware
  const checkJwt = auth({
    audience: config.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${config.AUTH0_DOMAIN}`,
    tokenSigningAlg: 'RS256'
  });

  try {
    await checkJwt(req, res, (err: any) => {
      if (err) {
        logger.error('Authentication error:', err);
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    });
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}; 