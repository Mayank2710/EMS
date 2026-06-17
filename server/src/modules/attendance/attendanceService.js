import AttendanceModel from "./attendanceModel.js";

import ApiError from "../../utils/ApiError.js";

const checkIn =
  async (employeeId) => {
    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const existing =
      await AttendanceModel.findOne(
        {
          employee:
            employeeId,
          date: today,
        }
      );

    if (existing) {
      throw new ApiError(
        409,
        "Already checked in today"
      );
    }

    return await AttendanceModel.create(
      {
        employee:
          employeeId,
        date: today,
        checkIn:
          new Date(),
      }
    );
  };

const checkOut =
  async (attendanceId) => {
    const attendance =
      await AttendanceModel.findById(
        attendanceId
      );

    if (!attendance) {
      throw new ApiError(
        404,
        "Attendance not found"
      );
    }

    attendance.checkOut =
      new Date();

    await attendance.save();

    return attendance;
  };

const getAttendance =
  async () => {
    return await AttendanceModel.find()
      .populate({
        path: "employee",
        populate: {
          path: "authUser",
          select:
            "fullName email",
        },
      })
      .sort({
        createdAt: -1,
      });
  };

export default {
  checkIn,
  checkOut,
  getAttendance,
};