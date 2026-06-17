import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import "./Sidebar.css";

function Sidebar() {
  const { user } = useSelector(
    (state) => state.auth
  );

  const role = user?.role;

  return (
    <aside className="sidebar">
      <h2>EMS</h2>

      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>

          {(role === "ADMIN" ||
            role === "HR") && (
            <li>
              <Link to="/employees">
                Employees
              </Link>
            </li>
          )}

          {role === "ADMIN" && (
            <li>
              <Link to="/departments">
                Departments
              </Link>
            </li>
          )}

          <li>
            <Link to="/attendance">
              Attendance
            </Link>
          </li>

          <li>
            <Link to="/leaves">
              Leave
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;