import ApiResponse from "../../utils/ApiResponse.js";

import employeeService from "./employeeService.js";

import {
  validateEmployeeData,
} from "./employeeValidation.js";

const createEmployee =
  async (
    req,
    res,
    next
  ) => {
    try {
      validateEmployeeData(
        req.body
      );

      const employee =
        await employeeService.createEmployee(
          req.body
        );

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            "Employee created successfully",
            employee
          )
        );
    } catch (error) {
      next(error);
    }
  };

const getEmployees =
  async (
    req,
    res,
    next
  ) => {
    try {
      const employees =
        await employeeService.getEmployees();

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Employees fetched successfully",
            employees
          )
        );
    } catch (error) {
      next(error);
    }
  };

const updateEmployee =
  async (
    req,
    res,
    next
  ) => {
    try {
      const employee =
        await employeeService.updateEmployee(
          req.params.id,
          req.body
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Employee updated successfully",
            employee
          )
        );
    } catch (error) {
      next(error);
    }
  };

const deleteEmployee =
  async (
    req,
    res,
    next
  ) => {
    try {
      await employeeService.deleteEmployee(
        req.params.id
      );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Employee deleted successfully"
          )
        );
    } catch (error) {
      next(error);
    }
  };

export default {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};