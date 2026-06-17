import ApiResponse from "../../utils/ApiResponse.js";

import leaveService from "./leaveService.js";

import {
  validateLeaveData,
} from "./leaveValidation.js";

const applyLeave =
  async (
    req,
    res,
    next
  ) => {
    try {
      validateLeaveData(
        req.body
      );

      const leave =
        await leaveService.applyLeave(
          req.body
        );

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            "Leave applied successfully",
            leave
          )
        );
    } catch (error) {
      next(error);
    }
  };

const getLeaves =
  async (
    req,
    res,
    next
  ) => {
    try {
      const leaves =
        await leaveService.getLeaves();

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Leaves fetched successfully",
            leaves
          )
        );
    } catch (error) {
      next(error);
    }
  };

const approveLeave =
  async (
    req,
    res,
    next
  ) => {
    try {
      const leave =
        await leaveService.approveLeave(
          req.params.id,
          req.user._id
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Leave approved",
            leave
          )
        );
    } catch (error) {
      next(error);
    }
  };

const rejectLeave =
  async (
    req,
    res,
    next
  ) => {
    try {
      const leave =
        await leaveService.rejectLeave(
          req.params.id,
          req.user._id
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Leave rejected",
            leave
          )
        );
    } catch (error) {
      next(error);
    }
  };

export default {
  applyLeave,
  getLeaves,
  approveLeave,
  rejectLeave,
};