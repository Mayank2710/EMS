import { Router } from "express";

import departmentController from "./departmentController.js";

import { protect } from "../auth/authMiddleware.js";

import { authorize } from "../auth/roleMiddleware.js";

import {
  USER_ROLES,
} from "../../constants/authConstants.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Create Department
|--------------------------------------------------------------------------
| ADMIN ONLY
*/

router.post(
  "/",
  protect,
  authorize(
    USER_ROLES.ADMIN
  ),
  departmentController.createDepartment
);

/*
|--------------------------------------------------------------------------
| Get Departments
|--------------------------------------------------------------------------
| ALL AUTHENTICATED USERS
*/

router.get(
  "/",
  protect,
  departmentController.getDepartments
);

/*
|--------------------------------------------------------------------------
| Update Department
|--------------------------------------------------------------------------
| ADMIN ONLY
*/

router.put(
  "/:id",
  protect,
  authorize(
    USER_ROLES.ADMIN
  ),
  departmentController.updateDepartment
);

/*
|--------------------------------------------------------------------------
| Delete Department
|--------------------------------------------------------------------------
| ADMIN ONLY
*/

router.delete(
  "/:id",
  protect,
  authorize(
    USER_ROLES.ADMIN
  ),
  departmentController.deleteDepartment
);

export default router;