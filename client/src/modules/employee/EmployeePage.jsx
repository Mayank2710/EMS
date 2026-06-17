import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../shared/layouts/DashboardLayout";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getUsers,
} from "../../features/employeeApi";

import {
  getDepartments,
} from "../../features/departmentApi";

import "./EmployeePage.css";

function EmployeePage() {
  const [
    employees,
    setEmployees,
  ] = useState([]);

  const [users, setUsers] =
    useState([]);

  const [
    departments,
    setDepartments,
  ] = useState([]);

  const [
    editingId,
    setEditingId,
  ] = useState(null);

  const [
    formData,
    setFormData,
  ] = useState({
    authUser: "",
    department: "",
    phone: "",
    designation: "",
    salary: "",
  });

  const loadEmployees =
    async () => {
      const response =
        await getEmployees();

      setEmployees(
        response.data
      );
    };

  const loadUsers =
    async () => {
      const response =
        await getUsers();

      setUsers(
        response.data
      );
    };

  const loadDepartments =
    async () => {
      const response =
        await getDepartments();

      setDepartments(
        response.data
      );
    };

  useEffect(() => {
    loadEmployees();
    loadUsers();
    loadDepartments();
  }, []);

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const resetForm = () => {
    setFormData({
      authUser: "",
      department: "",
      phone: "",
      designation: "",
      salary: "",
    });

    setEditingId(null);
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        if (editingId) {
          await updateEmployee(
            editingId,
            {
              department:
                formData.department,
              phone:
                formData.phone,
              designation:
                formData.designation,
              salary:
                formData.salary,
            }
          );

          alert(
            "Employee updated successfully"
          );
        } else {
          await createEmployee(
            formData
          );

          alert(
            "Employee created successfully"
          );
        }

        resetForm();

        loadEmployees();
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Operation failed"
        );
      }
    };

  const handleEdit =
    (employee) => {
      setEditingId(
        employee._id
      );

      setFormData({
        authUser:
          employee.authUser?._id ||
          "",
        department:
          employee.department
            ?._id || "",
        phone:
          employee.phone || "",
        designation:
          employee.designation ||
          "",
        salary:
          employee.salary || "",
      });
    };

  const handleDelete =
    async (id) => {
      const confirmed =
        window.confirm(
          "Delete employee?"
        );

      if (!confirmed) return;

      await deleteEmployee(id);

      loadEmployees();
    };

  return (
    <DashboardLayout>
      <div className="employee-page">
        <h1>
          Employee Management
        </h1>

        <form
          className="employee-form"
          onSubmit={
            handleSubmit
          }
        >
          {!editingId && (
            <select
              name="authUser"
              value={
                formData.authUser
              }
              onChange={
                handleChange
              }
              required
            >
              <option value="">
                Select User
              </option>

              {users.map(
                (user) => (
                  <option
                    key={
                      user._id
                    }
                    value={
                      user._id
                    }
                  >
                    {
                      user.fullName
                    }{" "}
                    -
                    {
                      user.email
                    }
                  </option>
                )
              )}
            </select>
          )}

          <select
            name="department"
            value={
              formData.department
            }
            onChange={
              handleChange
            }
          >
            <option value="">
              Select Department
            </option>

            {departments.map(
              (
                department
              ) => (
                <option
                  key={
                    department._id
                  }
                  value={
                    department._id
                  }
                >
                  {
                    department.name
                  }
                </option>
              )
            )}
          </select>

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={
              formData.phone
            }
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={
              formData.designation
            }
            onChange={
              handleChange
            }
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={
              formData.salary
            }
            onChange={
              handleChange
            }
          />

          <div className="form-actions">
            <button
              type="submit"
            >
              {editingId
                ? "Update Employee"
                : "Create Employee"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={
                  resetForm
                }
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="employee-list">
          {employees.map(
            (employee) => (
              <div
                key={
                  employee._id
                }
                className="employee-card"
              >
                <h3>
                  {
                    employee.employeeId
                  }
                </h3>

                <p>
                  <strong>
                    Name:
                  </strong>{" "}
                  {
                    employee
                      ?.authUser
                      ?.fullName
                  }
                </p>

                <p>
                  <strong>
                    Email:
                  </strong>{" "}
                  {
                    employee
                      ?.authUser
                      ?.email
                  }
                </p>

                <p>
                  <strong>
                    Department:
                  </strong>{" "}
                  {
                    employee
                      ?.department
                      ?.name
                  }
                </p>

                <p>
                  <strong>
                    Designation:
                  </strong>{" "}
                  {
                    employee.designation
                  }
                </p>

                <p>
                  <strong>
                    Salary:
                  </strong>{" "}
                  ₹
                  {
                    employee.salary
                  }
                </p>

                <div className="card-actions">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(
                        employee
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        employee._id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EmployeePage;