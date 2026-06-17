import DepartmentModel from "./departmentModel.js";

import ApiError from "../../utils/ApiError.js";

const createDepartment =
  async ({
    name,
    description,
  }) => {
    const existingDepartment =
      await DepartmentModel.findOne({
        name,
      });

    if (existingDepartment) {
      throw new ApiError(
        409,
        "Department already exists"
      );
    }

    return await DepartmentModel.create({
      name,
      description,
    });
  };

const getDepartments =
  async () => {
    return await DepartmentModel.find()
      .sort({
        createdAt: -1,
      });
  };

const updateDepartment =
  async (
    departmentId,
    data
  ) => {
    const department =
      await DepartmentModel.findByIdAndUpdate(
        departmentId,
        data,
        {
          new: true,
        }
      );

    if (!department) {
      throw new ApiError(
        404,
        "Department not found"
      );
    }

    return department;
  };

const deleteDepartment =
  async (departmentId) => {
    const department =
      await DepartmentModel.findByIdAndDelete(
        departmentId
      );

    if (!department) {
      throw new ApiError(
        404,
        "Department not found"
      );
    }

    return true;
  };

export default {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
};