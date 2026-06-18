import { Router } from "express";

import payrollController from "./payrollController.js";

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
    USER_ROLES.ADMIN,
    USER_ROLES.HR
  ),
  payrollController.createPayroll
);

router.get(
  "/",
  protect,
  payrollController.getPayrolls
);

router.get(
  "/payslip/:id",
  protect,
  payrollController.downloadPayslip
);

router.put(
  "/paid/:id",
  protect,
  authorize(
    USER_ROLES.ADMIN,
    USER_ROLES.HR
  ),
  payrollController.markPayrollPaid
);

router.put(
  "/:id",
  protect,
  authorize(
    USER_ROLES.ADMIN,
    USER_ROLES.HR
  ),
  payrollController.updatePayroll
);

router.delete(
  "/:id",
  protect,
  authorize(
    USER_ROLES.ADMIN
  ),
  payrollController.deletePayroll
);

export default router;