import ApiResponse from "../../utils/ApiResponse.js";

import attendanceService from "./attendanceService.js";

const checkIn =
  async (
    req,
    res,
    next
  ) => {
    try {
      const attendance =
        await attendanceService.checkIn(
          req.body.employee
        );

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            "Check-in successful",
            attendance
          )
        );
    } catch (error) {
      next(error);
    }
  };

const checkOut =
  async (
    req,
    res,
    next
  ) => {
    try {
      const attendance =
        await attendanceService.checkOut(
          req.params.id
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Check-out successful",
            attendance
          )
        );
    } catch (error) {
      next(error);
    }
  };

const getAttendance =
  async (
    req,
    res,
    next
  ) => {
    try {
      const attendance =
        await attendanceService.getAttendance();

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Attendance fetched successfully",
            attendance
          )
        );
    } catch (error) {
      next(error);
    }
  };

export default {
  checkIn,
  checkOut,
  getAttendance,
};