import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sdkjh&2#@#@#$@#secretsDFSDF23SD^%^&&*W#@#";
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "7d";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "15m";

export const generateTokens = (
  userId: string
): { refreshToken: string; accessToken: string } => {
  const refreshToken = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN as any,
  });

  const accessToken = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRES_IN as any,
  });

  return { refreshToken, accessToken };
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};

export const decodeToken = (token: string): any => {
  return jwt.decode(token);
};
