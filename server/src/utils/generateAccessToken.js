import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const generateAccessToken = (payload) => {
  return jwt.sign(
    payload,
    env.jwtAccessSecret,
    {
      expiresIn: env.jwtAccessExpiresIn,
    }
  );
};

export default generateAccessToken;