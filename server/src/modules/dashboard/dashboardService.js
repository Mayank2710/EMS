import AuthModel from "../auth/authModel.js";
import EmployeeModel from "../employee/employeeModel.js";
import AttendanceModel from "../attendance/attendanceModel.js";
import LeaveModel from "../leave/leaveModel.js";
import PayrollModel from "../payroll/payrollModel.js";

const getDashboardStats =
  async (user) => {
    if (
      user.role ===
      "EMPLOYEE"
    ) {
      const employee =
        await EmployeeModel.findOne({
          authUser: user._id,
        });

      if (!employee) {
        return {
          payrolls: 0,
          attendance: 0,
          approvedLeaves: 0,
          pendingLeaves: 0,
        };
      }

      const [
        payrolls,
        attendance,
        approvedLeaves,
        pendingLeaves,
      ] = await Promise.all([
        PayrollModel.countDocuments({
          employee:
            employee._id,
        }),

        AttendanceModel.countDocuments(
          {
            employee:
              employee._id,
          }
        ),

        LeaveModel.countDocuments({
          employee:
            employee._id,
          status:
            "APPROVED",
        }),

        LeaveModel.countDocuments({
          employee:
            employee._id,
          status:
            "PENDING",
        }),
      ]);

      return {
        role: "EMPLOYEE",
        payrolls,
        attendance,
        approvedLeaves,
        pendingLeaves,
      };
    }

    const [
      totalUsers,
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      totalAttendance,
      totalLeaves,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,
      totalPayrolls,
      paidPayrolls,
      pendingPayrolls,
      paidPayrollList,
    ] = await Promise.all([
      AuthModel.countDocuments(),

      EmployeeModel.countDocuments(),

      EmployeeModel.countDocuments({
        status: "ACTIVE",
      }),

      EmployeeModel.countDocuments({
        status: "INACTIVE",
      }),

      AttendanceModel.countDocuments(),

      LeaveModel.countDocuments(),

      LeaveModel.countDocuments({
        status:
          "PENDING",
      }),

      LeaveModel.countDocuments({
        status:
          "APPROVED",
      }),

      LeaveModel.countDocuments({
        status:
          "REJECTED",
      }),

      PayrollModel.countDocuments(),

      PayrollModel.countDocuments({
        status: "PAID",
      }),

      PayrollModel.countDocuments({
        status:
          "GENERATED",
      }),

      PayrollModel.find({
        status: "PAID",
      }),
    ]);

    const totalSalaryPaid =
      paidPayrollList.reduce(
        (
          total,
          payroll
        ) =>
          total +
          payroll.netSalary,
        0
      );

    return {
      role: user.role,

      totalUsers,

      totalEmployees,
      activeEmployees,
      inactiveEmployees,

      totalAttendance,

      totalLeaves,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,

      totalPayrolls,
      paidPayrolls,
      pendingPayrolls,

      totalSalaryPaid,
    };
  };

export default {
  getDashboardStats,
};