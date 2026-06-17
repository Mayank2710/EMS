import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../shared/layouts/DashboardLayout";

import {
  getAttendance,
  checkIn,
  checkOut,
} from "../../features/attendanceApi";

import {
  getEmployees,
} from "../../features/employeeApi";

import "./AttendancePage.css";

function AttendancePage() {
  const [
    attendance,
    setAttendance,
  ] = useState([]);

  const [
    employees,
    setEmployees,
  ] = useState([]);

  const [
    employeeId,
    setEmployeeId,
  ] = useState("");

  const loadAttendance =
    async () => {
      try {
        const response =
          await getAttendance();

        setAttendance(
          response.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  const loadEmployees =
    async () => {
      try {
        const response =
          await getEmployees();

        setEmployees(
          response.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadAttendance();
    loadEmployees();
  }, []);

  const handleCheckIn =
    async () => {
      try {
        await checkIn(
          employeeId
        );

        setEmployeeId("");

        loadAttendance();
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Check In Failed"
        );
      }
    };

  const handleCheckOut =
    async (id) => {
      try {
        await checkOut(id);

        loadAttendance();
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Check Out Failed"
        );
      }
    };

  return (
    <DashboardLayout>
      <div className="attendance-page">
        <h1>
          Attendance
        </h1>

        <div className="attendance-form">
          <select
            value={
              employeeId
            }
            onChange={(e) =>
              setEmployeeId(
                e.target.value
              )
            }
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

          <button
            onClick={
              handleCheckIn
            }
          >
            Check In
          </button>
        </div>

        <div className="attendance-list">
          {attendance.map(
            (record) => (
              <div
                key={
                  record._id
                }
                className="attendance-card"
              >
                <h3>
                  {
                    record
                      ?.employee
                      ?.authUser
                      ?.fullName
                  }
                </h3>

                <p>
                  Status:
                  {" "}
                  {
                    record.status
                  }
                </p>

                <p>
                  Check In:
                  {" "}
                  {record.checkIn
                    ? new Date(
                        record.checkIn
                      ).toLocaleTimeString()
                    : "-"}
                </p>

                <p>
                  Check Out:
                  {" "}
                  {record.checkOut
                    ? new Date(
                        record.checkOut
                      ).toLocaleTimeString()
                    : "-"}
                </p>

                {!record.checkOut && (
                  <button
                    onClick={() =>
                      handleCheckOut(
                        record._id
                      )
                    }
                  >
                    Check Out
                  </button>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AttendancePage;