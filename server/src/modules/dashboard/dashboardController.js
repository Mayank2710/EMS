import ApiResponse from "../../utils/ApiResponse.js";

import dashboardService from "./dashboardService.js";

const getDashboardStats =
  async (
    req,
    res,
    next
  ) => {
    try {
      const stats =
        await dashboardService.getDashboardStats(
          req.user
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Dashboard statistics fetched successfully",
            stats
          )
        );
    } catch (error) {
      next(error);
    }
  };

export default {
  getDashboardStats,
};