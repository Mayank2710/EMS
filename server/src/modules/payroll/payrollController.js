import ApiResponse from "../../utils/ApiResponse.js";

import payrollService from "./payrollService.js";

import {
  validatePayrollData,
} from "./payrollValidation.js";

const createPayroll =
  async (
    req,
    res,
    next
  ) => {
    try {
      validatePayrollData(
        req.body
      );

      const payroll =
        await payrollService.createPayroll(
          req.body
        );

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            "Payroll generated successfully",
            payroll
          )
        );
    } catch (error) {
      next(error);
    }
  };

const getPayrolls =
  async (
    req,
    res,
    next
  ) => {
    try {
      const payrolls =
        await payrollService.getPayrolls(
          req.user
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Payrolls fetched successfully",
            payrolls
          )
        );
    } catch (error) {
      next(error);
    }
  };

const markPayrollPaid =
  async (
    req,
    res,
    next
  ) => {
    try {
      const payroll =
        await payrollService.markPayrollPaid(
          req.params.id
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Payroll marked as paid",
            payroll
          )
        );
    } catch (error) {
      next(error);
    }
  };

const updatePayroll =
  async (
    req,
    res,
    next
  ) => {
    try {
      const payroll =
        await payrollService.updatePayroll(
          req.params.id,
          req.body
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Payroll updated successfully",
            payroll
          )
        );
    } catch (error) {
      next(error);
    }
  };

const deletePayroll =
  async (
    req,
    res,
    next
  ) => {
    try {
      await payrollService.deletePayroll(
        req.params.id
      );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Payroll deleted successfully"
          )
        );
    } catch (error) {
      next(error);
    }
  };

const downloadPayslip =
  async (
    req,
    res,
    next
  ) => {
    try {
      await payrollService.generatePayslip(
        req.params.id,
        res
      );
    } catch (error) {
      next(error);
    }
  };

export default {
  createPayroll,
  getPayrolls,
  markPayrollPaid,
  updatePayroll,
  deletePayroll,
  downloadPayslip,
};