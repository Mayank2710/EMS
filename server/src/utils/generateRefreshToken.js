import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    env.jwtRefreshSecret,
    {
      expiresIn: env.jwtRefreshExpiresIn,
    }
  );
};

export default generateRefreshToken;