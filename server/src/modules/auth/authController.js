import ApiResponse from "../../utils/ApiResponse.js";

import authService from "./authService.js";

import { validateRegisterData } from "./authValidation.js";

import { AUTH_COOKIE_NAMES } from "../../constants/authConstants.js";

const register = async (
  req,
  res,
  next
) => {
  try {
    const {
      fullName,
      email,
      password,
    } = req.body;

    validateRegisterData(
      fullName,
      email,
      password
    );

    const user =
      await authService.registerUser({
        fullName,
        email,
        password,
      });

    return res.status(201).json(
      new ApiResponse(
        201,
        "User registered successfully",
        {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        }
      )
    );
  } catch (error) {
    next(error);
  }
};

const login = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } =
      req.body;

    const {
      user,
      accessToken,
      refreshToken,
    } = await authService.loginUser({
      email,
      password,
    });

    return res
      .cookie(
        AUTH_COOKIE_NAMES.ACCESS_TOKEN,
        accessToken,
        {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
          maxAge: 60 * 60 * 1000,
        }
      )
      .cookie(
        AUTH_COOKIE_NAMES.REFRESH_TOKEN,
        refreshToken,
        {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
          maxAge:
            7 *
            24 *
            60 *
            60 *
            1000,
        }
      )
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Login successful",
          {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
          }
        )
      );
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (
  req,
  res,
  next
) => {
  try {
    return res.status(200).json(
      new ApiResponse(
        200,
        "Current user fetched",
        req.user
      )
    );
  } catch (error) {
    next(error);
  }
};

const getUsers = async (
  req,
  res,
  next
) => {
  try {
    const users =
      await authService.getUsers();

    return res.status(200).json(
      new ApiResponse(
        200,
        "Users fetched successfully",
        users
      )
    );
  } catch (error) {
    next(error);
  }
};

const logout = async (
  req,
  res,
  next
) => {
  try {
    return res
      .clearCookie(
        AUTH_COOKIE_NAMES.ACCESS_TOKEN
      )
      .clearCookie(
        AUTH_COOKIE_NAMES.REFRESH_TOKEN
      )
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Logout successful"
        )
      );
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (
  req,
  res,
  next
) => {
  try {
    const refreshToken =
      req.cookies[
        AUTH_COOKIE_NAMES
          .REFRESH_TOKEN
      ];

    const accessToken =
      await authService.refreshUserToken(
        refreshToken
      );

    return res
      .cookie(
        AUTH_COOKIE_NAMES.ACCESS_TOKEN,
        accessToken,
        {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
          maxAge: 60 * 60 * 1000,
        }
      )
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Access token refreshed"
        )
      );
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (
  req,
  res,
  next
) => {
  try {
    const { email } = req.body;

    await authService.forgotPassword(
      email
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Password reset email sent"
      )
    );
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (
  req,
  res,
  next
) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    await authService.resetPassword(
      token,
      password
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Password reset successful"
      )
    );
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getCurrentUser,
  getUsers,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
};  