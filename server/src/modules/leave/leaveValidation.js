import ApiError from "../../utils/ApiError.js";

export const validateLeaveData =
  ({
    employee,
    leaveType,
    startDate,
    endDate,
    reason,
  }) => {
    if (!employee) {
      throw new ApiError(
        400,
        "Employee is required"
      );
    }

    if (!leaveType) {
      throw new ApiError(
        400,
        "Leave type is required"
      );
    }

    if (!startDate) {
      throw new ApiError(
        400,
        "Start date is required"
      );
    }

    if (!endDate) {
      throw new ApiError(
        400,
        "End date is required"
      );
    }

    if (!reason) {
      throw new ApiError(
        400,
        "Reason is required"
      );
    }
  };