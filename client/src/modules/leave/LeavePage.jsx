import {
  useEffect,
  useState,
} from "react";

import {
  useSelector,
} from "react-redux";

import DashboardLayout from "../../shared/layouts/DashboardLayout";

import {
  getLeaves,
  applyLeave,
  approveLeave,
  rejectLeave,
} from "../../features/leaveApi";

import {
  getEmployees,
} from "../../features/employeeApi";

import "./LeavePage.css";

function LeavePage() {
  const { user } =
    useSelector(
      (state) => state.auth
    );

  const [
    employees,
    setEmployees,
  ] = useState([]);

  const [leaves, setLeaves] =
    useState([]);

  const [
    formData,
    setFormData,
  ] = useState({
    employee: "",
    leaveType:
      "CASUAL",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const loadLeaves =
    async () => {
      const response =
        await getLeaves();

      setLeaves(
        response.data
      );
    };

  const loadEmployees =
    async () => {
      const response =
        await getEmployees();

      setEmployees(
        response.data
      );
    };

  useEffect(() => {
    loadLeaves();
    loadEmployees();
  }, []);

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await applyLeave(
          formData
        );

        loadLeaves();

        setFormData({
          employee: "",
          leaveType:
            "CASUAL",
          startDate: "",
          endDate: "",
          reason: "",
        });
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Failed"
        );
      }
    };

  const handleApprove =
    async (id) => {
      await approveLeave(id);

      loadLeaves();
    };

  const handleReject =
    async (id) => {
      await rejectLeave(id);

      loadLeaves();
    };

  return (
    <DashboardLayout>
      <div className="leave-page">
        <h1>
          Leave Management
        </h1>

        <form
          className="leave-form"
          onSubmit={
            handleSubmit
          }
        >
          <select
            name="employee"
            value={
              formData.employee
            }
            onChange={
              handleChange
            }
            required
          >
            <option value="">
              Select Employee
            </option>

            {employees.map(
              (employee) => (
                <option
                  key={
                    employee._id
                  }
                  value={
                    employee._id
                  }
                >
                  {
                    employee
                      ?.authUser
                      ?.fullName
                  }
                </option>
              )
            )}
          </select>

          <select
            name="leaveType"
            value={
              formData.leaveType
            }
            onChange={
              handleChange
            }
          >
            <option value="CASUAL">
              Casual Leave
            </option>

            <option value="SICK">
              Sick Leave
            </option>

            <option value="ANNUAL">
              Annual Leave
            </option>
          </select>

          <input
            type="date"
            name="startDate"
            value={
              formData.startDate
            }
            onChange={
              handleChange
            }
          />

          <input
            type="date"
            name="endDate"
            value={
              formData.endDate
            }
            onChange={
              handleChange
            }
          />

          <textarea
            name="reason"
            placeholder="Reason"
            value={
              formData.reason
            }
            onChange={
              handleChange
            }
          />

          <button
            type="submit"
          >
            Apply Leave
          </button>
        </form>

        <div className="leave-list">
          {leaves.map(
            (leave) => (
              <div
                key={
                  leave._id
                }
                className="leave-card"
              >
                <h3>
                  {
                    leave
                      ?.employee
                      ?.authUser
                      ?.fullName
                  }
                </h3>

                <p>
                  Type:
                  {" "}
                  {
                    leave.leaveType
                  }
                </p>

                <p>
                  Status:
                  {" "}
                  <span
                    className={`status ${leave.status.toLowerCase()}`}
                  >
                    {
                      leave.status
                    }
                  </span>
                </p>

                <p>
                  {
                    leave.reason
                  }
                </p>

                {(user?.role ===
                  "ADMIN" ||
                  user?.role ===
                    "HR") &&
                  leave.status ===
                    "PENDING" && (
                    <div className="leave-actions">
                      <button
                        onClick={() =>
                          handleApprove(
                            leave._id
                          )
                        }
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleReject(
                            leave._id
                          )
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}
              </div>
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LeavePage;