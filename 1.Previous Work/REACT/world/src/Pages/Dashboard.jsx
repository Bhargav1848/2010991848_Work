import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import "../Styles/dashboard.css";
import PopUp from "./PopUp";
import { deleteFunc } from "../Functions/delete";
import DeleteIcon from "@mui/icons-material/Delete";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
function Dashboard() {
  const data = JSON.parse(localStorage.getItem("Users"));
  return data.length == 0 ? (
    <PopUp error="100"></PopUp>
  ) : (
    <div className="dashboard">
      <ListGroup as="ul">
        <ListGroup.Item action variant="success" className="list-item">
          <div className="d-flex">
            <div className="fw-bold column column1">
              <b>S.No</b>
            </div>
            <div className="fw-bold column column2">
              <b>Name</b>
            </div>
            <div className="fw-bold column column3">
              <b>Email</b>
            </div>
            <div className="fw-bold column column4">
              <b>Profile Picture</b>
            </div>
          </div>
        </ListGroup.Item>
        {data.map((value, index) => {
          return (
            <ListGroup.Item
              action
              key={value.user_id}
              variant=""
              className="list-item"
            >
              <div className="d-flex">
                <div className="fw-bold column column1">{index + 1}</div>
                <div className="fw-bold column column2">{value.user_name}</div>
                <div className="fw-bold column column3">{value.user_email}</div>
                <div className="fw-bold column column4">
                  <div className="image ">
                    <img
                      width="50px"
                      height="50px"
                      src={value.user_image}
                      alt="here"
                    />
                  </div>
                </div>
                <div className="fw-bold column column5 button">
                  <a href={"/User/" + value.user_id}>
                    <Button className="edit-icon" variant="otuline-primary">
                      Edit
                    </Button>
                  </a>
                </div>
                <div className="fw-bold column column6 button">
                  <Button
                    onClick={() => deleteFunc(value.user_id)}
                    className="delete-icon "
                    variant="outline-danger"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default Dashboard;
