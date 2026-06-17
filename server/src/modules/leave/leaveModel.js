import mongoose from "mongoose";

const leaveSchema =
  new mongoose.Schema(
    {
      employee: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
      },

      leaveType: {
        type: String,
        enum: [
          "CASUAL",
          "SICK",
          "ANNUAL",
        ],
        required: true,
      },

      startDate: {
        type: Date,
        required: true,
      },

      endDate: {
        type: Date,
        required: true,
      },

      reason: {
        type: String,
        required: true,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "APPROVED",
          "REJECTED",
        ],
        default: "PENDING",
      },

      approvedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

const LeaveModel =
  mongoose.model(
    "Leave",
    leaveSchema
  );

export default LeaveModel;