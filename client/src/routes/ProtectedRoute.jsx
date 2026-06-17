import { useSelector } from "react-redux";

import {
  Navigate,
} from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const {
    isAuthenticated,
    isLoading,
    user,
  } = useSelector(
    (state) => state.auth
  );

  if (isLoading) {
    return (
      <div
        style={{
          padding: "50px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(
      user?.role
    )
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;