import ApiError from "../../utils/ApiError.js";

import verifyAccessToken from "../../utils/verifyAccessToken.js";

import AuthModel from "./authModel.js";

import { AUTH_COOKIE_NAMES } from "../../constants/authConstants.js";

export const protect = async (
  req,
  res,
  next
) => {
  try {
    const token =
      req.cookies[
        AUTH_COOKIE_NAMES.ACCESS_TOKEN
      ];

    if (!token) {
      throw new ApiError(
        401,
        "Access token missing"
      );
    }

    const decoded =
      verifyAccessToken(token);

    const user =
      await AuthModel.findById(
        decoded.userId
      ).select("-password");

    if (!user) {
      throw new ApiError(
        401,
        "User not found"
      );
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};