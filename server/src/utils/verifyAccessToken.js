import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

const verifyAccessToken = (token) => {
  return jwt.verify(
    token,
    env.jwtAccessSecret
  );
};

export default verifyAccessToken;