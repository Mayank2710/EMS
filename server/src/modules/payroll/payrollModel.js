import mongoose from "mongoose";

const payrollSchema =
  new mongoose.Schema(
    {
      employee: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
      },

      month: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
      },

      year: {
        type: Number,
        required: true,
      },

      basicSalary: {
        type: Number,
        required: true,
        default: 0,
      },

      bonus: {
        type: Number,
        default: 0,
      },

      deduction: {
        type: Number,
        default: 0,
      },

      netSalary: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "GENERATED",
          "PAID",
        ],
        default: "GENERATED",
      },
    },
    {
      timestamps: true,
    }
  );

const PayrollModel =
  mongoose.model(
    "Payroll",
    payrollSchema
  );

export default PayrollModel;