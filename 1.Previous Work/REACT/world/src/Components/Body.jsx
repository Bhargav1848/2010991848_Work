import React from "react";
import image from "../Images/home-svg.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../Styles/home-body.css";
function Body() {
  return (
    <div className="home-body">
      <div className="image-part">
        <img
          style={{
            minWidth: "40vw",
            minHeight: "40vw",
            width: "40vw",
            height: "40vw",
          }}
          src={image}
        />
      </div>
      <div className="body-data">
        <center>
          <h1 className="body-heading">Lifecare.com,</h1>
          <p className="tagline">Where life is taken care of.</p>
          <br />
          <Link to="/map">
            <Button variant="outline-primary" size="lg">
              Nearby Hospitals
            </Button>
          </Link>
        </center>
      </div>
    </div>
  );
}

export default Body;
