import React from "react";
import "../Styles/login.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import PopUp from "./PopUp";
import { Navigate } from "react-router-dom";
import { register } from "../Functions/register";
function Register() {
  const [isRegistered, setIsRegistered] = useState("201");
  const [fileName, setFileName] = useState("");

  const checkRegistration = (e) => {
    setIsRegistered(register(e), console.log(isRegistered));
  };
  useEffect(() => {
    var a = "Hello";
  }, [isRegistered]);
  return (
    <>
      {isRegistered != "201" && <PopUp error={isRegistered} />}
      {/* {isRegistered == "202" &&
        setTimeout(() => {
          window.location.replace("http://localhost:3000/");
        }, 700)} */}
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={checkRegistration}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <a className="link-primary" href="/login">
                Sign In
              </a>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
              />
            </div>
            <br />
            <input
              type="file"
              className="custom-file-label"
              id="inputGroupFile01"
              label={fileName}
              onChange={(e) => setFileName(e.target.files[0].name)}
              custom
            />
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>

            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
