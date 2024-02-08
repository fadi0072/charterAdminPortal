import React, { useState, useEffect } from "react";
import "../../assets/css/login.css";
import { Link } from "react-router-dom";
import authLayout from "../../hoc/authLayout";
import { useNavigate } from "react-router-dom";
import CustomPreloader from "../../common/Preloader";

import { loginUser } from "../../api/api";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useUser } from "../../globalStorage/UserProvider";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const { addToast } = useToasts();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    console.log("savedEmail", savedEmail);
    const savedPassword = localStorage.getItem("savedPassword");
    const savedRememberMe = localStorage.getItem("savedRememberMe");

    if (savedRememberMe === "true" && savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = () => {
    // Toggle the value of rememberMe when the checkbox changes
    setRememberMe(!rememberMe);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      addToast("Email and password cannot be empty", {
        appearance: "error",
        autoDismiss: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser(email, password, "admin");
      console.log("Login response:", response);
      updateUser(response);

      // Save user token in localStorage
      localStorage.setItem("userToken", response?.token);

      addToast(response.message, {
        appearance: "success",
        autoDismiss: 3000,
      }); // Assuming the response has a message field

      // Save login info if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
        localStorage.setItem("savedPassword", password);
        localStorage.setItem("savedRememberMe", "true");
      } else {
        // Clear saved login info if "Remember Me" is unchecked
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
        localStorage.removeItem("savedRememberMe");
      }

      navigate("/Dashboard");
    } catch (error) {
      console.error("Login error:", error);
      addToast("An error occurred during login", {
        appearance: "error",
        autoDismiss: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="login-form">
        <div className="text-center">
          <img
            alt="Alt content"
            src={require("../../assets/images/logo.png")}
            style={{
              width: "50%",
              alignSelf: "center",
              alignItems: "center",
              alignContent: "center",
            }}
            className="mx-auto" // Center the image horizontally
          />
        </div>
        <div className="d-flex align-items-center my-4">
          <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
        </div>
        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3">
            Email address
          </label>
          <input
            type="email"
            id="form3Example3"
            className="form-control form-control-lg"
            placeholder="Enter a valid email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-3">
          <label className="form-label" htmlFor="form3Example4">
            Password
          </label>
          <input
            type="password"
            id="form3Example4"
            className="form-control form-control-lg"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          {/* <!-- Checkbox --> */}
          <div className="form-check mb-0">
            <input
              className="form-check-input me-2"
              type="checkbox"
              value=""
              id="form2Example3"
              onChange={handleRememberMeChange}
            />
            <label className="form-check-label" htmlFor="form2Example3">
              Remember me
            </label>
          </div>
          <Link to="/reset-password" className="text-body">
            Forgot password?
          </Link>
        </div>

        <div className="text-center text-lg-start mt-4 pt-2">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleLogin}
          >
            Login
          </button>
          {loading && <CustomPreloader loading={loading} />}

          <p className="small fw-bold mt-2 pt-1 mb-0">
            <a href="#!" className="link-danger"></a>
          </p>
        </div>
      </form>
    </>
  );
};

export default authLayout(LoginPage);
