import bcrypt from "bcryptjs";
import crypto from "crypto";

import AuthModel from "./authModel.js";

import ApiError from "../../utils/ApiError.js";

import generateAccessToken from "../../utils/generateAccessToken.js";
import generateRefreshToken from "../../utils/generateRefreshToken.js";

import verifyRefreshToken from "../../utils/verifyRefreshToken.js";

import { sendEmail } from "../../services/mailService.js";

import { env } from "../../config/env.js";

const registerUser = async ({
  fullName,
  email,
  password,
}) => {
  const existingUser =
    await AuthModel.findOne({ email });

  if (existingUser) {
    throw new ApiError(
      409,
      "User already exists with this email"
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await AuthModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async ({
  email,
  password,
}) => {
  const user =
    await AuthModel.findOne({ email });

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  const isPasswordMatched =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordMatched) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const payload = {
    userId: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken =
    generateAccessToken(payload);

  const refreshToken =
    generateRefreshToken(payload);

  user.refreshToken = refreshToken;

  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const refreshUserToken = async (
  refreshToken
) => {
  const decoded =
    verifyRefreshToken(
      refreshToken
    );

  const user =
    await AuthModel.findById(
      decoded.userId
    );

  if (!user) {
    throw new ApiError(
      401,
      "User not found"
    );
  }

  if (
    user.refreshToken !== refreshToken
  ) {
    throw new ApiError(
      401,
      "Invalid refresh token"
    );
  }

  const payload = {
    userId: user._id,
    role: user.role,
    email: user.email,
  };

  return generateAccessToken(payload);
};

const forgotPassword = async (
  email
) => {
  const user =
    await AuthModel.findOne({ email });

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  const resetToken =
    crypto.randomBytes(32).toString(
      "hex"
    );

  const hashedToken =
    crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

  user.resetPasswordToken =
    hashedToken;

  user.resetPasswordExpire =
    Date.now() + 15 * 60 * 1000;

  await user.save();

  const resetUrl =
    `${env.frontendUrl}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject:
      "EMS Password Reset Request",
    html: `
      <h2>Password Reset Request</h2>
      <p>Click below link:</p>
      <a href="${resetUrl}">
        Reset Password
      </a>
    `,
  });

  return true;
};

const resetPassword = async (
  token,
  password
) => {
  const hashedToken =
    crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

  const user =
    await AuthModel.findOne({
      resetPasswordToken:
        hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

  if (!user) {
    throw new ApiError(
      400,
      "Invalid or expired token"
    );
  }

  user.password =
    await bcrypt.hash(password, 10);

  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save();

  return true;
};

const getUsers = async () => {
  return await AuthModel.find()
    .select(
      "_id fullName email role"
    )
    .sort({
      createdAt: -1,
    });
};

export default {
  registerUser,
  loginUser,
  refreshUserToken,
  forgotPassword,
  resetPassword,
  getUsers,
};