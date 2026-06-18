import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "../modules/auth/LoginPage";
import RegisterPage from "../modules/auth/RegisterPage";

import DashboardPage from "../modules/dashboard/DashboardPage";
import DepartmentPage from "../modules/department/DepartmentPage";
import EmployeePage from "../modules/employee/EmployeePage";
import AttendancePage from "../modules/attendance/AttendancePage";
import LeavePage from "../modules/leave/LeavePage";

import PayrollPage from "../modules/payroll/PayrollPage";
import MyPayrollPage from "../modules/payroll/MyPayrollPage";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={
            <RegisterPage />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
              ]}
            >
              <DepartmentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "HR",
              ]}
            >
              <EmployeePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "HR",
                "EMPLOYEE",
              ]}
            >
              <AttendancePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaves"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "HR",
                "EMPLOYEE",
              ]}
            >
              <LeavePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payrolls"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ADMIN",
                "HR",
              ]}
            >
              <PayrollPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-payroll"
          element={
            <ProtectedRoute
              allowedRoles={[
                "EMPLOYEE",
              ]}
            >
              <MyPayrollPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;