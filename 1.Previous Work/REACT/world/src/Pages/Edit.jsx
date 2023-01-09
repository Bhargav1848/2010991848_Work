import { useState } from "react";
import React from "react";
import "../Styles/login.css";
import { borderRadius } from "@mui/system";
import PopUp from "./PopUp";
import { save } from "../Functions/save";
function Edit() {
  const path = window.location.pathname;
  const [id, setId] = useState(path.replace("/User/", ""));

  const data = JSON.parse(localStorage.getItem("Users"));
  const user = data.find((o) => o.user_id === id);
  const [fileName, setFileName] = useState("Change Profile Picture");
  const [saved, setSaved] = useState("201");
  const [username, setUsername] = useState(user.user_name);
  const [useremail, setUseremail] = useState(user.user_email);
  const saveChanges = (e) => {
    setSaved(save(e));
  };
  return (
    <>
      {saved != "201" && <PopUp error={saved} />}
      {/* {saved == "602" &&
        setTimeout(() => {
          window.location.replace("http://localhost:3000/Dashboard");
        }, 700)} */}
      <br />
      <br />
      <div>
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={saveChanges}>
            <div className="Auth-form-content">
              <div
                className="title-image"
                style={{
                  position: "absolute",
                  display: "flex",
                  borderRadius: "50%",
                  justifyContent: "center",
                  top: -70,
                  left: "4vw",
                  overflow: "hidden",
                  boxShadow: "0px 1px 7px 2px black",
                }}
              >
                <img width="150px" height="150px" src={user.user_image} />
              </div>
              <br />
              <br />
              <div className="form-group mt-3">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g Jane Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Email Address"
                  value={useremail}
                  onChange={(e) => setUseremail(e.target.value)}
                />
              </div>
              <br />
              <input
                type="file"
                className="custom-file-label"
                id="inputGroupFile02"
                label={fileName}
                onChange={(e) => setFileName(e.target.files[0].name)}
                custom
              />
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
