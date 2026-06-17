import apiClient from "../shared/services/apiClient";

export const getAttendance =
  async () => {
    const response =
      await apiClient.get(
        "/attendance"
      );

    return response.data;
  };

export const checkIn =
  async (employee) => {
    const response =
      await apiClient.post(
        "/attendance/check-in",
        {
          employee,
        }
      );

    return response.data;
  };

export const checkOut =
  async (attendanceId) => {
    const response =
      await apiClient.put(
        `/attendance/check-out/${attendanceId}`
      );

    return response.data;
  };