import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

const verifyRefreshToken = (token) => {
  return jwt.verify(
    token,
    env.jwtRefreshSecret
  );
};

export default verifyRefreshToken;