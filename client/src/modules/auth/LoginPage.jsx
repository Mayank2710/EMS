import { useState } from "react";

import { useDispatch } from "react-redux";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  loginUser,
  getCurrentUser,
} from "../../features/auth/authApi";

import {
  setUser,
} from "../../features/auth/authSlice";

import "./LoginPage.css";

function LoginPage() {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await loginUser(
          formData
        );

        const response =
          await getCurrentUser();

        dispatch(
          setUser(
            response.data
          )
        );

        navigate(
          "/dashboard"
        );
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Login Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>
          EMS Login
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
          />

          <button
            type="submit"
          >
            {loading
              ? "Please Wait..."
              : "Login"}
          </button>
        </form>

        <p>
          No Account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;