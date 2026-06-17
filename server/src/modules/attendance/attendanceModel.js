import mongoose from "mongoose";

const attendanceSchema =
  new mongoose.Schema(
    {
      employee: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
      },

      date: {
        type: Date,
        required: true,
      },

      checkIn: {
        type: Date,
        default: null,
      },

      checkOut: {
        type: Date,
        default: null,
      },

      status: {
        type: String,
        enum: [
          "PRESENT",
          "ABSENT",
        ],
        default: "PRESENT",
      },
    },
    {
      timestamps: true,
    }
  );

const AttendanceModel =
  mongoose.model(
    "Attendance",
    attendanceSchema
  );

export default AttendanceModel;