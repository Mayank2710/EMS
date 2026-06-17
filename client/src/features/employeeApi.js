import apiClient from "../shared/services/apiClient";

export const getEmployees =
  async () => {
    const response =
      await apiClient.get(
        "/employees"
      );

    return response.data;
  };

export const createEmployee =
  async (data) => {
    const response =
      await apiClient.post(
        "/employees",
        data
      );

    return response.data;
  };

export const updateEmployee =
  async (id, data) => {
    const response =
      await apiClient.put(
        `/employees/${id}`,
        data
      );

    return response.data;
  };

export const deleteEmployee =
  async (id) => {
    const response =
      await apiClient.delete(
        `/employees/${id}`
      );

    return response.data;
  };

export const getUsers =
  async () => {
    const response =
      await apiClient.get(
        "/auth/users"
      );

    return response.data;
  };