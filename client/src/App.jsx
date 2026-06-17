import { useEffect } from "react";

import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";

import { loadCurrentUser } from "./features/auth/authActions";

function App() {
  const dispatch =
    useDispatch();

  useEffect(() => {
    dispatch(
      loadCurrentUser()
    );
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;