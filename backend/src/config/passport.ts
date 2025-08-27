// config/passport.ts
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { userModal } from '../entities/user.entity';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  // Crash early so you don't debug phantom auth failures
  throw new Error('JWT_SECRET is not set');
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload: any, done) => {
    try {
      // Optional: check exp yourself if you don’t trust clock skew
      const user = await userModal.findById(payload.id).select('-password');
      if (!user || user.isDeleted) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

// No sessions used, so no serialize/deserialize needed
export default passport;
