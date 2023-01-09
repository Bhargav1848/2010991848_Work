import React from "react";
import Content from "./Content";

function About() {
  return (
    <div>
      <div>Main is About</div>
      <div>
        Child Component is:
        <Content />
      </div>
    </div>
  );
}

export default About;
