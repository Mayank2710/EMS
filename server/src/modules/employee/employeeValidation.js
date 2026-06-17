import ApiError from "../../utils/ApiError.js";

export const validateEmployeeData =
  ({
    authUser,
  }) => {
    if (!authUser) {
      throw new ApiError(
        400,
        "User is required"
      );
    }
  };