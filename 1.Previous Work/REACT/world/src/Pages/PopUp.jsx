import React from "react";
import { Alert } from "react-bootstrap";
function PopUp(props) {
  const ERRORS = {
    302: ["User already exists", "danger"],
    202: ["Registered Successfully", "success"],
    102: ["Successfully Logged in", "success"],
    404: ["Any of the field can't be empty", "danger"],
    504: ["Invalid credentials", "primary"],
    100: ["Database is Empty", "dark"],
    602: ["Saved Successfully", "success"],
  };
  return (
    <div>
      <Alert
        style={{
          width: "80%",
          transition: "all 0.4s",
          margin: "5px auto",
        }}
        variant={ERRORS[props.error][1]}
      >
        {ERRORS[props.error][0]}
      </Alert>
    </div>
  );
}

export default PopUp;
