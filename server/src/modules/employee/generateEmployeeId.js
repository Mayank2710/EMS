import EmployeeModel from "./employeeModel.js";

const generateEmployeeId =
  async () => {
    const lastEmployee =
      await EmployeeModel.findOne()
        .sort({
          createdAt: -1,
        });

    if (!lastEmployee) {
      return "EMP001";
    }

    const lastNumber =
      parseInt(
        lastEmployee.employeeId.replace(
          "EMP",
          ""
        )
      );

    const nextNumber =
      lastNumber + 1;

    return `EMP${String(
      nextNumber
    ).padStart(3, "0")}`;
  };

export default generateEmployeeId;