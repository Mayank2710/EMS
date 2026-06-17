import ApiError from "../../utils/ApiError.js";

export const validateDepartmentData =
  (name) => {
    if (!name?.trim()) {
      throw new ApiError(
        400,
        "Department name is required"
      );
    }
  };