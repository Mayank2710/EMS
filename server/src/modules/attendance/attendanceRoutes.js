import { Router } from "express";

import attendanceController from "./attendanceController.js";

import { protect } from "../auth/authMiddleware.js";

const router = Router();

router.post(
  "/check-in",
  protect,
  attendanceController.checkIn
);

router.put(
  "/check-out/:id",
  protect,
  attendanceController.checkOut
);

router.get(
  "/",
  protect,
  attendanceController.getAttendance
);

export default router;