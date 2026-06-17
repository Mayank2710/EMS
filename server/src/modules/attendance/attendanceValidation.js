import ApiError from "../../utils/ApiError.js";

export const validateAttendanceData =
  (employeeId) => {
    if (!employeeId) {
      throw new ApiError(
        400,
        "Employee is required"
      );
    }
  };