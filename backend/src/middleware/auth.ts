import passport from "passport";
import { UnauthorizedException } from "../utils/exceptions";

// middleware/auth.ts
export const authMiddleware = (req:any, res:any, next:any) => {
  passport.authenticate('jwt', { session: false }, (err:any, user:any, info:any) => {
    if (err) return next(new UnauthorizedException('Authentication failed'));
    if (!user) {
      console.log('JWT debug:', {
        name: info?.name,
        message: info?.message,
      });
      const reason =
        info?.name === 'TokenExpiredError' ? 'Token expired' :
        info?.name === 'JsonWebTokenError' ? 'Invalid token' :
        'Access token required or invalid';
      return next(new UnauthorizedException(reason));
    }
    (req as any).user = user;
    next();
  })(req, res, next);
};
