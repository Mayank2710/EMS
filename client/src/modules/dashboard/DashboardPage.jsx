import {
  useEffect,
  useState,
} from "react";

import {
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import DashboardLayout from "../../shared/layouts/DashboardLayout";

import UserProfileCard from "./UserProfileCard";

import {
  getDashboardStats,
} from "../../features/dashboardApi";

import "./DashboardPage.css";

function DashboardPage() {
  const { user } = useSelector(
    (state) => state.auth
  );

  const navigate =
    useNavigate();

  const [
    stats,
    setStats,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const loadDashboard =
    async () => {
      try {
        const response =
          await getDashboardStats();

        setStats(
          response.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <h2>
          Loading Dashboard...
        </h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <h1>Dashboard</h1>

        <p>
          Welcome,
          {" "}
          <strong>
            {user?.fullName}
          </strong>
        </p>

        <p>
          Role:
          {" "}
          <strong>
            {user?.role}
          </strong>
        </p>

        <div className="stats-grid">

          {user?.role ===
            "ADMIN" && (
            <>
              <div
                className="stat-card clickable"
                onClick={() =>
                  navigate(
                    "/employees"
                  )
                }
              >
                <h3>
                  Employees
                </h3>

                <span>
                  {
                    stats?.totalEmployees
                  }
                </span>
              </div>

              <div className="stat-card success">
                <h3>
                  Active Employees
                </h3>

                <span>
                  {
                    stats?.activeEmployees
                  }
                </span>
              </div>

              <div className="stat-card danger">
                <h3>
                  Inactive Employees
                </h3>

                <span>
                  {
                    stats?.inactiveEmployees
                  }
                </span>
              </div>

              <div
                className="stat-card clickable"
                onClick={() =>
                  navigate(
                    "/attendance"
                  )
                }
              >
                <h3>
                  Attendance
                </h3>

                <span>
                  {
                    stats?.totalAttendance
                  }
                </span>
              </div>

              <div
                className="stat-card clickable"
                onClick={() =>
                  navigate(
                    "/leaves"
                  )
                }
              >
                <h3>
                  Leaves
                </h3>

                <span>
                  {
                    stats?.totalLeaves
                  }
                </span>
              </div>

              <div className="stat-card warning">
                <h3>
                  Pending Leaves
                </h3>

                <span>
                  {
                    stats?.pendingLeaves
                  }
                </span>
              </div>

              <div className="stat-card success">
                <h3>
                  Approved Leaves
                </h3>

                <span>
                  {
                    stats?.approvedLeaves
                  }
                </span>
              </div>

              <div className="stat-card danger">
                <h3>
                  Rejected Leaves
                </h3>

                <span>
                  {
                    stats?.rejectedLeaves
                  }
                </span>
              </div>

              <div
                className="stat-card clickable"
                onClick={() =>
                  navigate(
                    "/payrolls"
                  )
                }
              >
                <h3>
                  Payrolls
                </h3>

                <span>
                  {
                    stats?.totalPayrolls
                  }
                </span>
              </div>

              <div className="stat-card success">
                <h3>
                  Paid Payrolls
                </h3>

                <span>
                  {
                    stats?.paidPayrolls
                  }
                </span>
              </div>

              <div className="stat-card warning">
                <h3>
                  Pending Payrolls
                </h3>

                <span>
                  {
                    stats?.pendingPayrolls
                  }
                </span>
              </div>

              <div className="stat-card salary">
                <h3>
                  Total Salary Paid
                </h3>

                <span>
                  ₹
                  {Number(
                    stats?.totalSalaryPaid ||
                      0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>
            </>
          )}

          {user?.role ===
            "HR" && (
            <>
              <div
                className="stat-card clickable"
                onClick={() =>
                  navigate(
                    "/employees"
                  )
                }
              >
                <h3>
                  Employees
                </h3>

                <span>
                  {
                    stats?.totalEmployees
                  }
                </span>
              </div>

              <div
                className="stat-card clickable"
                onClick={() =>
                  navigate(
                    "/attendance"
                  )
                }
              >
                <h3>
                  Attendance
                </h3>

                <span>
                  {
                    stats?.totalAttendance
                  }
                </span>
              </div>

              <div
                className="stat-card clickable"
                onClick={() =>
                  navigate(
                    "/leaves"
                  )
                }
              >
                <h3>
                  Leaves
                </h3>

                <span>
                  {
                    stats?.totalLeaves
                  }
                </span>
              </div>

              <div
                className="stat-card clickable"
                onClick={() =>
                  navigate(
                    "/payrolls"
                  )
                }
              >
                <h3>
                  Payrolls
                </h3>

                <span>
                  {
                    stats?.totalPayrolls
                  }
                </span>
              </div>
            </>
          )}

          {user?.role ===
            "EMPLOYEE" && (
            <>
              <div className="stat-card">
                <h3>
                  My Payrolls
                </h3>

                <span>
                  {
                    stats?.payrolls
                  }
                </span>
              </div>

              <div className="stat-card">
                <h3>
                  Attendance
                </h3>

                <span>
                  {
                    stats?.attendance
                  }
                </span>
              </div>

              <div className="stat-card success">
                <h3>
                  Approved Leaves
                </h3>

                <span>
                  {
                    stats?.approvedLeaves
                  }
                </span>
              </div>

              <div className="stat-card warning">
                <h3>
                  Pending Leaves
                </h3>

                <span>
                  {
                    stats?.pendingLeaves
                  }
                </span>
              </div>
            </>
          )}

        </div>

        <UserProfileCard />
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;