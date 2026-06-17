import ApiResponse from "../../utils/ApiResponse.js";

import departmentService from "./departmentService.js";

import {
  validateDepartmentData,
} from "./departmentValidation.js";

const createDepartment =
  async (
    req,
    res,
    next
  ) => {
    try {
      const {
        name,
        description,
      } = req.body;

      validateDepartmentData(
        name
      );

      const department =
        await departmentService.createDepartment(
          {
            name,
            description,
          }
        );

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            "Department created successfully",
            department
          )
        );
    } catch (error) {
      next(error);
    }
  };

const getDepartments =
  async (
    req,
    res,
    next
  ) => {
    try {
      const departments =
        await departmentService.getDepartments();

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Departments fetched successfully",
            departments
          )
        );
    } catch (error) {
      next(error);
    }
  };

const updateDepartment =
  async (
    req,
    res,
    next
  ) => {
    try {
      const department =
        await departmentService.updateDepartment(
          req.params.id,
          req.body
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Department updated successfully",
            department
          )
        );
    } catch (error) {
      next(error);
    }
  };

const deleteDepartment =
  async (
    req,
    res,
    next
  ) => {
    try {
      await departmentService.deleteDepartment(
        req.params.id
      );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Department deleted successfully"
          )
        );
    } catch (error) {
      next(error);
    }
  };

export default {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
};