import { Router } from "express";

import leaveController from "./leaveController.js";

import { protect } from "../auth/authMiddleware.js";

import { authorize } from "../auth/roleMiddleware.js";

import {
  USER_ROLES,
} from "../../constants/authConstants.js";

const router = Router();

router.post(
  "/",
  protect,
  leaveController.applyLeave
);

router.get(
  "/",
  protect,
  leaveController.getLeaves
);

router.put(
  "/approve/:id",
  protect,
  authorize(
    USER_ROLES.ADMIN,
    USER_ROLES.HR
  ),
  leaveController.approveLeave
);

router.put(
  "/reject/:id",
  protect,
  authorize(
    USER_ROLES.ADMIN,
    USER_ROLES.HR
  ),
  leaveController.rejectLeave
);

export default router;