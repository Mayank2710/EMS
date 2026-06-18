import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSelector } from "react-redux";

import DashboardLayout from "../../shared/layouts/DashboardLayout";

import {
  getPayrolls,
  createPayroll,
  deletePayroll,
  markPayrollPaid,
} from "../../features/payrollApi";

import {
  getEmployees,
} from "../../features/employeeApi";

import "./PayrollPage.css";

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

function PayrollPage() {
  const { user } = useSelector(
    (state) => state.auth
  );

  const role = user?.role;

  const isEmployee =
    role === "EMPLOYEE";

  const [
    payrolls,
    setPayrolls,
  ] = useState([]);

  const [
    employees,
    setEmployees,
  ] = useState([]);

  const [
    formData,
    setFormData,
  ] = useState({
    employee: "",
    month: "",
    year:
      new Date().getFullYear(),
    basicSalary: "",
    bonus: "",
    deduction: "",
  });

  const loadPayrolls =
    async () => {
      try {
        const response =
          await getPayrolls();

        setPayrolls(
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
    loadPayrolls();

    if (!isEmployee) {
      loadEmployees();
    }
  }, []);

  const handleChange =
    (e) => {
      const {
        name,
        value,
      } = e.target;

      if (
        name === "employee"
      ) {
        const selectedEmployee =
          employees.find(
            (
              employee
            ) =>
              employee._id ===
              value
          );

        setFormData({
          ...formData,
          employee: value,
          basicSalary:
            selectedEmployee?.salary ||
            0,
        });

        return;
      }

      setFormData({
        ...formData,
        [name]: value,
      });
    };

  const netSalary =
    useMemo(() => {
      return (
        Number(
          formData.basicSalary ||
            0
        ) +
        Number(
          formData.bonus || 0
        ) -
        Number(
          formData.deduction ||
            0
        )
      );
    }, [formData]);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await createPayroll({
          employee:
            formData.employee,
          month:
            Number(
              formData.month
            ),
          year:
            Number(
              formData.year
            ),
          bonus:
            Number(
              formData.bonus
            ) || 0,
          deduction:
            Number(
              formData.deduction
            ) || 0,
        });

        await loadPayrolls();

        setFormData({
          employee: "",
          month: "",
          year:
            new Date().getFullYear(),
          basicSalary: "",
          bonus: "",
          deduction: "",
        });
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Failed to generate payroll"
        );
      }
    };

  const handleDelete =
    async (id) => {
      const confirmed =
        window.confirm(
          "Delete payroll?"
        );

      if (!confirmed) {
        return;
      }

      try {
        await deletePayroll(
          id
        );

        await loadPayrolls();
      } catch (error) {
        console.error(error);
      }
    };

  const handleMarkPaid =
    async (id) => {
      try {
        await markPayrollPaid(
          id
        );

        await loadPayrolls();
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Failed to mark payroll as paid"
        );
      }
    };

  return (
    <DashboardLayout>
      <div className="payroll-page">
        <h1>
          Payroll Management
        </h1>

        {!isEmployee && (
          <form
            className="payroll-form"
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
                (
                  employee
                ) => (
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
              name="month"
              value={
                formData.month
              }
              onChange={
                handleChange
              }
              required
            >
              <option value="">
                Select Month
              </option>

              {MONTHS.map(
                (month) => (
                  <option
                    key={
                      month.value
                    }
                    value={
                      month.value
                    }
                  >
                    {
                      month.label
                    }
                  </option>
                )
              )}
            </select>

            <input
              type="number"
              name="year"
              placeholder="Year"
              value={
                formData.year
              }
              onChange={
                handleChange
              }
              required
            />

            <input
              type="number"
              name="basicSalary"
              placeholder="Current Salary"
              value={
                formData.basicSalary
              }
              readOnly
            />

            <input
              type="number"
              name="bonus"
              placeholder="Bonus"
              value={
                formData.bonus
              }
              onChange={
                handleChange
              }
            />

            <input
              type="number"
              name="deduction"
              placeholder="Deduction"
              value={
                formData.deduction
              }
              onChange={
                handleChange
              }
            />

            <div className="net-salary-preview">
              Net Salary : ₹
              {netSalary.toLocaleString(
                "en-IN"
              )}
            </div>

            <button
              type="submit"
            >
              Generate Payroll
            </button>
          </form>
        )}

        <div className="payroll-list">
          {payrolls.map(
            (payroll) => (
              <div
                key={
                  payroll._id
                }
                className="payroll-card"
              >
                <h3>
                  {
                    payroll
                      ?.employee
                      ?.authUser
                      ?.fullName
                  }
                </h3>

                <p>
                  <strong>
                    Month:
                  </strong>{" "}
                  {
                    MONTHS.find(
                      (
                        month
                      ) =>
                        month.value ===
                        payroll.month
                    )?.label
                  }
                </p>

                <p>
                  <strong>
                    Year:
                  </strong>{" "}
                  {payroll.year}
                </p>

                <p>
                  <strong>
                    Basic Salary:
                  </strong>{" "}
                  ₹
                  {Number(
                    payroll.basicSalary
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p>
                  <strong>
                    Bonus:
                  </strong>{" "}
                  ₹
                  {Number(
                    payroll.bonus
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p>
                  <strong>
                    Deduction:
                  </strong>{" "}
                  ₹
                  {Number(
                    payroll.deduction
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p>
                  <strong>
                    Net Salary:
                  </strong>{" "}
                  ₹
                  {Number(
                    payroll.netSalary
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>

                <div
                  className={`status ${
                    payroll.status?.toLowerCase() ||
                    "generated"
                  }`}
                >
                  {payroll.status}
                </div>

                {(role ===
                  "ADMIN" ||
                  role === "HR") && (
                  <div className="payroll-actions">
                    {payroll.status !==
                      "PAID" && (
                      <button
                        className="paid-btn"
                        onClick={() =>
                          handleMarkPaid(
                            payroll._id
                          )
                        }
                      >
                        Mark Paid
                      </button>
                    )}

                    {role ===
                      "ADMIN" && (
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            payroll._id
                          )
                        }
                      >
                        Delete
                      </button>
                    )}
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

export default PayrollPage;