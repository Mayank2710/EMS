import { Router } from "express";

import authController from "./authController.js";

import { protect } from "./authMiddleware.js";

import { authorize } from "./roleMiddleware.js";

import {
  USER_ROLES,
} from "../../constants/authConstants.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

router.post(
  "/register",
  authController.register
);

router.post(
  "/login",
  authController.login
);

router.post(
  "/logout",
  authController.logout
);

router.post(
  "/refresh-token",
  authController.refreshToken
);

/*
|--------------------------------------------------------------------------
| Password Management
|--------------------------------------------------------------------------
*/

router.post(
  "/forgot-password",
  authController.forgotPassword
);

router.post(
  "/reset-password/:token",
  authController.resetPassword
);

/*
|--------------------------------------------------------------------------
| Current User
|--------------------------------------------------------------------------
*/

router.get(
  "/me",
  protect,
  authController.getCurrentUser
);

/*
|--------------------------------------------------------------------------
| User Management
|--------------------------------------------------------------------------
| ADMIN ONLY
*/

router.get(
  "/users",
  protect,
  authorize(
    USER_ROLES.ADMIN
  ),
  authController.getUsers
);

/*
|--------------------------------------------------------------------------
| Admin Test
|--------------------------------------------------------------------------
*/

router.get(
  "/admin-test",
  protect,
  authorize(
    USER_ROLES.ADMIN
  ),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message:
        "Welcome Admin",
    });
  }
);

export default router;