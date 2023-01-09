import React from "react";
import { BrowserRouter, Route, Router } from "react-router-dom";
function Button(props) {
  return (
    <div>
      <button style={{ backgroundColor: props.color }} onClick={props.onclick}>
        Click
      </button>
    </div>
  );
}

export default Button;
