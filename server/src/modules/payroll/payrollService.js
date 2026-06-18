import PDFDocument from "pdfkit";

import PayrollModel from "./payrollModel.js";

import EmployeeModel from "../employee/employeeModel.js";

import ApiError from "../../utils/ApiError.js";

const createPayroll =
  async ({
    employee,
    month,
    year,
    bonus,
    deduction,
  }) => {
    const employeeExists =
      await EmployeeModel.findById(
        employee
      )
        .populate(
          "authUser",
          "fullName email role"
        )
        .populate(
          "department",
          "name"
        );

    if (!employeeExists) {
      throw new ApiError(
        404,
        "Employee not found"
      );
    }

    const existingPayroll =
      await PayrollModel.findOne({
        employee,
        month,
        year,
      });

    if (existingPayroll) {
      throw new ApiError(
        409,
        "Payroll already generated for this month"
      );
    }

    const basicSalary =
      employeeExists.salary || 0;

    const netSalary =
      Number(basicSalary) +
      Number(bonus || 0) -
      Number(deduction || 0);

    return await PayrollModel.create({
      employee,
      month,
      year,
      basicSalary,
      bonus:
        Number(bonus) || 0,
      deduction:
        Number(deduction) || 0,
      netSalary,
      status:
        "GENERATED",
    });
  };

const getPayrolls =
  async (user) => {
    if (
      user.role ===
      "EMPLOYEE"
    ) {
      const employee =
        await EmployeeModel.findOne(
          {
            authUser:
              user._id,
          }
        );

      if (!employee) {
        return [];
      }

      return await PayrollModel.find(
        {
          employee:
            employee._id,
        }
      )
        .populate({
          path: "employee",
          populate: [
            {
              path: "authUser",
              select:
                "fullName email role",
            },
            {
              path: "department",
              select: "name",
            },
          ],
        })
        .sort({
          createdAt: -1,
        });
    }

    return await PayrollModel.find()
      .populate({
        path: "employee",
        populate: [
          {
            path: "authUser",
            select:
              "fullName email role",
          },
          {
            path: "department",
            select: "name",
          },
        ],
      })
      .sort({
        createdAt: -1,
      });
  };

const markPayrollPaid =
  async (payrollId) => {
    const payroll =
      await PayrollModel.findByIdAndUpdate(
        payrollId,
        {
          status: "PAID",
        },
        {
          new: true,
        }
      );

    if (!payroll) {
      throw new ApiError(
        404,
        "Payroll not found"
      );
    }

    return payroll;
  };

const updatePayroll =
  async (
    payrollId,
    data
  ) => {
    const payroll =
      await PayrollModel.findById(
        payrollId
      );

    if (!payroll) {
      throw new ApiError(
        404,
        "Payroll not found"
      );
    }

    const bonus =
      Number(data.bonus) || 0;

    const deduction =
      Number(
        data.deduction
      ) || 0;

    const netSalary =
      payroll.basicSalary +
      bonus -
      deduction;

    return await PayrollModel.findByIdAndUpdate(
      payrollId,
      {
        ...data,
        netSalary,
      },
      {
        new: true,
      }
    );
  };

const deletePayroll =
  async (payrollId) => {
    const payroll =
      await PayrollModel.findByIdAndDelete(
        payrollId
      );

    if (!payroll) {
      throw new ApiError(
        404,
        "Payroll not found"
      );
    }

    return true;
  };

const generatePayslip =
  async (
    payrollId,
    res
  ) => {
    const payroll =
      await PayrollModel.findById(
        payrollId
      ).populate({
        path: "employee",
        populate: [
          {
            path: "authUser",
            select:
              "fullName email",
          },
          {
            path: "department",
            select: "name",
          },
        ],
      });

    if (!payroll) {
      throw new ApiError(
        404,
        "Payroll not found"
      );
    }

    const doc =
      new PDFDocument({
        margin: 50,
      });

    const employee =
      payroll.employee;

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=payslip-${employee.employeeId}.pdf`
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text(
        "EMPLOYEE PAYSLIP",
        {
          align: "center",
        }
      );

    doc.moveDown();

    doc
      .fontSize(12)
      .text(
        `Employee ID: ${employee.employeeId}`
      );

    doc.text(
      `Employee Name: ${employee.authUser?.fullName}`
    );

    doc.text(
      `Email: ${employee.authUser?.email}`
    );

    doc.text(
      `Department: ${
        employee.department
          ?.name || "-"
      }`
    );

    doc.text(
      `Designation: ${
        employee.designation ||
        "-"
      }`
    );

    doc.moveDown();

    doc.text(
      `Month: ${payroll.month}`
    );

    doc.text(
      `Year: ${payroll.year}`
    );

    doc.moveDown();

    doc.text(
      `Basic Salary: ₹${payroll.basicSalary}`
    );

    doc.text(
      `Bonus: ₹${payroll.bonus}`
    );

    doc.text(
      `Deduction: ₹${payroll.deduction}`
    );

    doc.text(
      `Net Salary: ₹${payroll.netSalary}`
    );

    doc.text(
      `Status: ${payroll.status}`
    );

    doc.moveDown();

    doc.text(
      `Generated On: ${new Date().toLocaleDateString()}`
    );

    doc.end();
  };

export default {
  createPayroll,
  getPayrolls,
  markPayrollPaid,
  updatePayroll,
  deletePayroll,
  generatePayslip,
};