import ApiError from "../../utils/ApiError.js";

export const validatePayrollData =
  (data) => {
    const {
      employee,
      month,
      year,
    } = data;

    if (!employee) {
      throw new ApiError(
        400,
        "Employee is required"
      );
    }

    if (!month) {
      throw new ApiError(
        400,
        "Month is required"
      );
    }

    if (!year) {
      throw new ApiError(
        400,
        "Year is required"
      );
    }

    if (
      Number(month) < 1 ||
      Number(month) > 12
    ) {
      throw new ApiError(
        400,
        "Month must be between 1 and 12"
      );
    }
  };