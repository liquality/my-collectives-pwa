import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from './classes/ApiError';

const middleware: {
  authenticateJWT?: (req: Request, res: Response, next: NextFunction) => void;
  adminArea?: (req: Request, res: Response, next: NextFunction) => void;
} = {};
middleware.authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // TODO: add secret in env variable/config file
  jwt.verify(token, 'my-secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    (req as any).user = user;

    next();
  });
};

middleware.adminArea = (req: Request, res: Response, next: NextFunction) => {
  /*  if (req.apiSession.is_admin) {
     next();
   } else {
     res.status(403).send({ message: 'Access denied' });
   } */
};

export default middleware;