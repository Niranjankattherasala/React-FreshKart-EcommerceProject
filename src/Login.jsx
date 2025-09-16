import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, currentUser } = useSelector(
    (state) => state.registerUser
  );

  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setLoginError("");
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      alert(`✅ Login successful. Welcome ${currentUser}!`);
      navigate("/Orders");
    } else if (isAuthenticated === false) {
      setLoginError("❌ Invalid username or password");
    }
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center min-vh-100">
      <div className="card login-card shadow-lg p-4">
        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)}>
          <h3 className="text-center mb-4 fw-bold text-dark">Login</h3>

          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg rounded-pill"
              placeholder="Username"
              {...register("username", { required: "Enter Username" })}
            />
            {errors.username && (
              <div className="text-danger mt-1 small">{errors.username.message}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg rounded-pill"
              placeholder="Password"
              {...register("password", { required: "Enter Password" })}
            />
            {errors.password && (
              <div className="text-danger mt-1 small">{errors.password.message}</div>
            )}
          </div>

          {loginError && (
            <div className="text-danger text-center mb-3">{loginError}</div>
          )}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg rounded-pill shadow-sm">
              Login
            </button>
          </div>

          <p className="text-center text-muted mt-4 mb-0">
            Don’t have an account?{" "}
            <Link to="/signup" className="fw-semibold text-primary">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
