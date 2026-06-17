import { Router } from "express";

import authRoutes from "../modules/auth/authRoutes.js";
import departmentRoutes from "../modules/department/departmentRoutes.js";
import employeeRoutes from "../modules/employee/employeeRoutes.js";
import attendanceRoutes from "../modules/attendance/attendanceRoutes.js";
import leaveRoutes from "../modules/leave/leaveRoutes.js";

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
| Auth Routes
|--------------------------------------------------------------------------
*/

router.use(
  "/auth",
  authRoutes
);

/*
|--------------------------------------------------------------------------
| Department Routes
|--------------------------------------------------------------------------
*/

router.use(
  "/departments",
  departmentRoutes
);

/*
|--------------------------------------------------------------------------
| Employee Routes
|--------------------------------------------------------------------------
*/

router.use(
  "/employees",
  employeeRoutes
);

/*
|--------------------------------------------------------------------------
| Attendance Routes
|--------------------------------------------------------------------------
*/

router.use(
  "/attendance",
  attendanceRoutes
);

/*
|--------------------------------------------------------------------------
| Leave Routes
|--------------------------------------------------------------------------
*/

router.use(
  "/leaves",
  leaveRoutes
);

export default router;