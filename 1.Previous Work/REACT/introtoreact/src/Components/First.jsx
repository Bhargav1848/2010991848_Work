import React from "react";

function First(props) {
  return (
    <div>
      {props.title}'s age is {props.age}
    </div>
  );
}

First.defaultProps = {
  title: "Amritansh",
  age: "5",
};
export default First;
