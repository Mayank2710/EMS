import {
  getCurrentUser,
  logoutUser,
} from "./authApi";

import {
  setUser,
  clearUser,
} from "./authSlice";

export const loadCurrentUser =
  () => async (dispatch) => {
    try {
      const response =
        await getCurrentUser();

      dispatch(
        setUser(
          response.data
        )
      );
    } catch (error) {
      dispatch(
        clearUser()
      );
    }
  };

export const logout =
  (navigate) =>
  async (dispatch) => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    }

    dispatch(
      clearUser()
    );

    navigate("/login");
  };