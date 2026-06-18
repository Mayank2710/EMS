import apiClient from "../shared/services/apiClient";

export const getPayrolls =
  async () => {
    const response =
      await apiClient.get(
        "/payrolls"
      );

    return response.data;
  };

export const createPayroll =
  async (data) => {
    const response =
      await apiClient.post(
        "/payrolls",
        data
      );

    return response.data;
  };

export const updatePayroll =
  async (id, data) => {
    const response =
      await apiClient.put(
        `/payrolls/${id}`,
        data
      );

    return response.data;
  };

export const markPayrollPaid =
  async (id) => {
    const response =
      await apiClient.put(
        `/payrolls/paid/${id}`
      );

    return response.data;
  };

export const deletePayroll =
  async (id) => {
    const response =
      await apiClient.delete(
        `/payrolls/${id}`
      );

    return response.data;
  };

export const downloadPayslip =
  async (id) => {
    const response =
      await apiClient.get(
        `/payrolls/payslip/${id}`,
        {
          responseType:
            "blob",
        }
      );

    const blob =
      new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      `payslip-${id}.pdf`;

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    window.URL.revokeObjectURL(
      url
    );
  };