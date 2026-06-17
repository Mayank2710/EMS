import EmployeeModel from "./employeeModel.js";

import AuthModel from "../auth/authModel.js";

import ApiError from "../../utils/ApiError.js";

import generateEmployeeId from "./generateEmployeeId.js";

const createEmployee = async ({
  authUser,
  department,
  phone,
  designation,
  salary,
  joiningDate,
}) => {
  const user =
    await AuthModel.findById(
      authUser
    );

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  const existingEmployee =
    await EmployeeModel.findOne({
      authUser,
    });

  if (existingEmployee) {
    throw new ApiError(
      409,
      "Employee profile already exists"
    );
  }

  const employeeId =
    await generateEmployeeId();

  return await EmployeeModel.create({
    employeeId,
    authUser,
    department,
    phone,
    designation,
    salary,
    joiningDate,
  });
};

const getEmployees =
  async () => {
    return await EmployeeModel.find()
      .populate(
        "authUser",
        "fullName email role"
      )
      .populate(
        "department",
        "name"
      )
      .sort({
        createdAt: -1,
      });
  };

const updateEmployee =
  async (
    employeeId,
    data
  ) => {
    const employee =
      await EmployeeModel.findByIdAndUpdate(
        employeeId,
        data,
        {
          new: true,
        }
      )
        .populate(
          "authUser",
          "fullName email role"
        )
        .populate(
          "department",
          "name"
        );

    if (!employee) {
      throw new ApiError(
        404,
        "Employee not found"
      );
    }

    return employee;
  };

const deleteEmployee =
  async (employeeId) => {
    const employee =
      await EmployeeModel.findByIdAndDelete(
        employeeId
      );

    if (!employee) {
      throw new ApiError(
        404,
        "Employee not found"
      );
    }

    return true;
  };

export default {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};