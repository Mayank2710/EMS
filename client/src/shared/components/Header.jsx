import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  logout,
} from "../../features/auth/authActions";

import "./Header.css";

function Header() {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const handleLogout =
    () => {
      dispatch(
        logout(
          navigate
        )
      );
    };

  return (
    <header className="header">
      <div>
        <h2>
          Employee Management System
        </h2>
      </div>

      <div className="header-right">
        <div className="user-info">
          <strong>
            {user?.fullName}
          </strong>

          <span className="role-badge">
            {user?.role}
          </span>
        </div>

        <button
          className="logout-btn"
          onClick={
            handleLogout
          }
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;