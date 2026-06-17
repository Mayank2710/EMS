import { useSelector } from "react-redux";

import "./UserProfileCard.css";

function UserProfileCard() {
  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="user-card">
      <h3>
        User Information
      </h3>

      <p>
        <strong>Name:</strong>{" "}
        {user?.fullName}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {user?.email}
      </p>

      <p>
        <strong>Role:</strong>{" "}
        {user?.role}
      </p>
    </div>
  );
}

export default UserProfileCard;