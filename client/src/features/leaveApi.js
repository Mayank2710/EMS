import apiClient from "../shared/services/apiClient";

export const getLeaves =
  async () => {
    const response =
      await apiClient.get(
        "/leaves"
      );

    return response.data;
  };

export const applyLeave =
  async (data) => {
    const response =
      await apiClient.post(
        "/leaves",
        data
      );

    return response.data;
  };

export const approveLeave =
  async (id) => {
    const response =
      await apiClient.put(
        `/leaves/approve/${id}`
      );

    return response.data;
  };

export const rejectLeave =
  async (id) => {
    const response =
      await apiClient.put(
        `/leaves/reject/${id}`
      );

    return response.data;
  };