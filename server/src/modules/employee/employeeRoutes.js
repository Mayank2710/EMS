import { Router } from "express";

import employeeController from "./employeeController.js";

import { protect } from "../auth/authMiddleware.js";

import { authorize } from "../auth/roleMiddleware.js";

import {
  USER_ROLES,
} from "../../constants/authConstants.js";

const router = Router();

router.post(
  "/",
  protect,
  authorize(
    USER_ROLES.ADMIN
  ),
  employeeController.createEmployee
);

router.get(
  "/",
  protect,
  employeeController.getEmployees
);

router.put(
  "/:id",
  protect,
  authorize(
    USER_ROLES.ADMIN
  ),
  employeeController.updateEmployee
);

router.delete(
  "/:id",
  protect,
  authorize(
    USER_ROLES.ADMIN
  ),
  employeeController.deleteEmployee
);

export default router;