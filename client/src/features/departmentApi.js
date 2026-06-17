import apiClient from "../shared/services/apiClient";

export const getDepartments =
  async () => {
    const response =
      await apiClient.get(
        "/departments"
      );

    return response.data;
  };

export const createDepartment =
  async (data) => {
    const response =
      await apiClient.post(
        "/departments",
        data
      );

    return response.data;
  };

export const deleteDepartment =
  async (id) => {
    const response =
      await apiClient.delete(
        `/departments/${id}`
      );

    return response.data;
  };