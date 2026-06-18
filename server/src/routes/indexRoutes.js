import { Router } from "express";

import authRoutes from "../modules/auth/authRoutes.js";
import departmentRoutes from "../modules/department/departmentRoutes.js";
import employeeRoutes from "../modules/employee/employeeRoutes.js";
import attendanceRoutes from "../modules/attendance/attendanceRoutes.js";
import leaveRoutes from "../modules/leave/leaveRoutes.js";
import payrollRoutes from "../modules/payroll/payrollRoutes.js";
import dashboardRoutes from "../modules/dashboard/dashboardRoutes.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

router.get(
  "/health",
  (req, res) => {
    return res.status(200).json({
      success: true,
      message:
        "EMS API is running",
    });
  }
);

/*
|--------------------------------------------------------------------------
| Module Routes
|--------------------------------------------------------------------------
*/

router.use(
  "/auth",
  authRoutes
);

router.use(
  "/dashboard",
  dashboardRoutes
);

router.use(
  "/departments",
  departmentRoutes
);

router.use(
  "/employees",
  employeeRoutes
);

router.use(
  "/attendance",
  attendanceRoutes
);

router.use(
  "/leaves",
  leaveRoutes
);

router.use(
  "/payrolls",
  payrollRoutes
);

export default router;