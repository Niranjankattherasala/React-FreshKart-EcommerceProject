import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { register } from "./store";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./signup.css"; // custom styles

function SignUp() {
  const {
    register: formRegister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (data) => {
    dispatch(register(data));
    alert("✅ User registered successfully!");
    navigate("/Login");
  };

  return (
    <div className="signup-wrapper d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 signup-card">
        <h2 className="text-center mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          {/* Full Name */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              {...formRegister("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>

          {/* Username */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              {...formRegister("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-danger">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              {...formRegister("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              {...formRegister("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
