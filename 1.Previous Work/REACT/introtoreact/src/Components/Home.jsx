import React from "react";
import About from "./About";

function Home() {
  return (
    <div>
      <div>Main is Home</div>

      <div>
        Child Component is:
        <About />
      </div>
    </div>
  );
}

export default Home;
