import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,

  isAuthenticated: false,

  isLoading: true,

  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setLoading: (
      state,
      action
    ) => {
      state.isLoading =
        action.payload;
    },

    setUser: (
      state,
      action
    ) => {
      state.user =
        action.payload;

      state.isAuthenticated =
        true;

      state.isLoading = false;

      state.error = null;
    },

    clearUser: (
      state
    ) => {
      state.user = null;

      state.isAuthenticated =
        false;

      state.isLoading = false;

      state.error = null;
    },

    setError: (
      state,
      action
    ) => {
      state.error =
        action.payload;
    },
  },
});

export const {
  setLoading,
  setUser,
  clearUser,
  setError,
} = authSlice.actions;

export default authSlice.reducer;