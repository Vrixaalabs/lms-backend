import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { User, UserRole } from '../models/User.ts';
import dotenv from 'dotenv';

dotenv.config();

const client = jwksClient({
  jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid!, (err, key) => {
    const signingKey = key?.getPublicKey();
    callback(err, signingKey);
  });
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) return next();

  jwt.verify(token, getKey, { algorithms: ['RS256'] }, async (err, decoded: any) => {
    if (err) {
      console.error('❌ authMiddleware error:', err);
      return next();
    }


    const auth0Id = decoded.sub;
    const email = decoded.email;
    const firstName = decoded.given_name || decoded.name?.split(' ')[0];
    const lastName = decoded.family_name || decoded.name?.split(' ')[1];

    let user = await User.findOne({ auth0Id });

    if (!user) {
      user = await User.create({
        email,
        firstName,
        lastName,
        auth0Id,
        role: UserRole.STUDENT, // or based on other rules
      });
    }

    req.user = user;
    next();
  });
};
