import { Router } from "express";

import dashboardController from "./dashboardController.js";

import { protect } from "../auth/authMiddleware.js";

const router = Router();

router.get(
  "/stats",
  protect,
  dashboardController.getDashboardStats
);

export default router;