import ApiError from "../../utils/ApiError.js";

export const authorize =
  (...roles) =>
  (req, res, next) => {
    try {
      if (!req.user) {
        throw new ApiError(
          401,
          "Unauthorized"
        );
      }

      if (
        !roles.includes(
          req.user.role
        )
      ) {
        throw new ApiError(
          403,
          "Access denied"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };