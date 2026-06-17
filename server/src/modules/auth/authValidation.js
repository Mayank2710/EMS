import ApiError from "../../utils/ApiError.js";

export const validateRegisterData = (
  fullName,
  email,
  password
) => {
  if (!fullName || !email || !password) {
    throw new ApiError(
      400,
      "All fields are required"
    );
  }

  if (fullName.trim().length < 3) {
    throw new ApiError(
      400,
      "Full name must be at least 3 characters"
    );
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new ApiError(
      400,
      "Invalid email format"
    );
  }

  if (password.length < 6) {
    throw new ApiError(
      400,
      "Password must be at least 6 characters"
    );
  }
};