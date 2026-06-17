import { useSelector } from "react-redux";

import DashboardLayout from "../../shared/layouts/DashboardLayout";

import UserProfileCard from "./UserProfileCard";

import "./DashboardPage.css";

function DashboardPage() {
  const { user } = useSelector(
    (state) => state.auth
  );

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

        <UserProfileCard />
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;