import React from "react";
import "../Styles/login.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { login } from "../Functions/login";
import PopUp from "./PopUp";
import { Navigate } from "react-router-dom";
function Login() {
  const [authenticated, setAuthenticated] = useState("201");
  //   return isAuthenticated ? (
  //     <Navigate replace to="/" />
  //   ) :
  const checkAuth = (e) => {
    setAuthenticated(login(e));
  };
  useEffect(() => {
    var heck = "Hello";
  }, [authenticated]);

  return authenticated == "2" ? (
    <Navigate to="/Dashboard" replace={true} />
  ) : (
    <>
      {authenticated != "201" && <PopUp error={authenticated} />}
      {authenticated == "102" &&
        setTimeout(() => {
          window.location.replace("http://localhost:3000/");
        }, 700)}
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={checkAuth}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <br />
            <Form.Group className="mb-3 d-flex" controlId="formBasicCheckbox">
              <Form.Check type="radio" label="User" id="user" name="radio" />
              &nbsp; &nbsp;
              <Form.Check type="radio" label="Admin" id="admin" name="radio" />
            </Form.Group>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
