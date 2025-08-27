import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { UnauthorizedException } from '../utils/exceptions';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
    if (err) {
      return next(new UnauthorizedException('Authentication failed'));
    }
    
    if (!user) {
      return next(new UnauthorizedException('Access token required or invalid'));
    }
    
    (req as any).user = user;
    next();
  })(req, res, next);
};
