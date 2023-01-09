import React from "react";

function Style() {
  const myStyle = {
    color: "darkcyan",
    fontSize: "23px",
    width: "50",
    height: 50,
    backgroundColor: "lightgreen",
    margin: "30px auto",
    textAlign: "center",
  };

  const main = {
    width: "100vw",
  };
  return (
    <div style={main}>
      <div style={myStyle}>Hello World</div>
    </div>
  );
}

export default Style;
