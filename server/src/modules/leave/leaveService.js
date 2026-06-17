import LeaveModel from "./leaveModel.js";

import ApiError from "../../utils/ApiError.js";

const applyLeave =
  async (data) => {
    return await LeaveModel.create(
      data
    );
  };

const getLeaves =
  async () => {
    return await LeaveModel.find()
      .populate({
        path: "employee",
        populate: {
          path: "authUser",
          select:
            "fullName email role",
        },
      })
      .populate(
        "approvedBy",
        "fullName email"
      )
      .sort({
        createdAt: -1,
      });
  };

const approveLeave =
  async (
    leaveId,
    approvedBy
  ) => {
    const leave =
      await LeaveModel.findById(
        leaveId
      );

    if (!leave) {
      throw new ApiError(
        404,
        "Leave not found"
      );
    }

    leave.status =
      "APPROVED";

    leave.approvedBy =
      approvedBy;

    await leave.save();

    return leave;
  };

const rejectLeave =
  async (
    leaveId,
    approvedBy
  ) => {
    const leave =
      await LeaveModel.findById(
        leaveId
      );

    if (!leave) {
      throw new ApiError(
        404,
        "Leave not found"
      );
    }

    leave.status =
      "REJECTED";

    leave.approvedBy =
      approvedBy;

    await leave.save();

    return leave;
  };

export default {
  applyLeave,
  getLeaves,
  approveLeave,
  rejectLeave,
};