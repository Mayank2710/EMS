import {
  useEffect,
  useState,
} from "react";

import {
  getDepartments,
  createDepartment,
  deleteDepartment,
} from "../../features/departmentApi";

import DashboardLayout from "../../shared/layouts/DashboardLayout";

import "./DepartmentPage.css";

function DepartmentPage() {
  const [
    departments,
    setDepartments,
  ] = useState([]);

  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const loadDepartments =
    async () => {
      try {
        const response =
          await getDepartments();

        setDepartments(
          response.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleCreate =
    async (e) => {
      e.preventDefault();

      try {
        await createDepartment({
          name,
          description,
        });

        setName("");
        setDescription("");

        loadDepartments();
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Failed"
        );
      }
    };

  const handleDelete =
    async (id) => {
      const confirmed =
        window.confirm(
          "Delete department?"
        );

      if (!confirmed) return;

      try {
        await deleteDepartment(
          id
        );

        loadDepartments();
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Delete failed"
        );
      }
    };

  return (
    <DashboardLayout>
      <div className="department-page">
        <h1>
          Departments
        </h1>

        <form
          onSubmit={
            handleCreate
          }
          className="department-form"
        >
          <input
            type="text"
            placeholder="Department Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Description"
            value={
              description
            }
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <button
            type="submit"
          >
            Create
          </button>
        </form>

        <div className="department-list">
          {departments.map(
            (
              department
            ) => (
              <div
                key={
                  department._id
                }
                className="department-card"
              >
                <h3>
                  {
                    department.name
                  }
                </h3>

                <p>
                  {
                    department.description
                  }
                </p>

                <button
                  onClick={() =>
                    handleDelete(
                      department._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DepartmentPage;