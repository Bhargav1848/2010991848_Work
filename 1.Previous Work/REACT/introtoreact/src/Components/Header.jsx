import React from "react";
import Button from "./Button";
function Header() {
  const onClick = (e) => {
    console.log("Click", e);
  };
  return (
    <div>
      <Button color="green" onclick={onClick} />
    </div>
  );
}

export default Header;
