import mongoose from "mongoose";

const employeeSchema =
  new mongoose.Schema(
    {
      employeeId: {
        type: String,
        required: true,
        unique: true,
      },

      authUser: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      department: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Department",
        default: null,
      },

      phone: {
        type: String,
        trim: true,
        default: "",
      },

      designation: {
        type: String,
        trim: true,
        default: "",
      },

      salary: {
        type: Number,
        default: 0,
      },

      joiningDate: {
        type: Date,
        default: Date.now,
      },

      status: {
        type: String,
        enum: [
          "ACTIVE",
          "INACTIVE",
        ],
        default: "ACTIVE",
      },
    },
    {
      timestamps: true,
    }
  );

const EmployeeModel =
  mongoose.model(
    "Employee",
    employeeSchema
  );

export default EmployeeModel;