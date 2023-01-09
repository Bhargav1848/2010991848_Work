import React from "react";
import "../Styles/about.css";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Person2Icon from "@mui/icons-material/Person2";
import FileCopyIcon from "@mui/icons-material/FileCopy";
function About() {
  return (
    <div className="about">
      <div class="context">
        <p>Welcome to Lifecare.com, How can we help?</p>
        <a href="/map">
          <div className="about-1 about-flex">
            <br />
            <AddLocationIcon className="icon" />
            <p className="about-text">
              Find a location <ArrowForwardIosIcon />{" "}
            </p>
          </div>
        </a>
        <a href="#">
          <div className="about-2 about-flex">
            <br />
            <LocalHospitalIcon className="icon" />
            <p className="about-text">
              Find a doctor <ArrowForwardIosIcon />{" "}
            </p>
          </div>
        </a>
        <a href="#">
          <div className="about-3 about-flex">
            <br />
            <Person2Icon className="icon" />
            <p className="about-text">
              Patient portal <ArrowForwardIosIcon />{" "}
            </p>
          </div>
        </a>
        <a href="#">
          <div className="about-4 about-flex">
            <br />
            <FileCopyIcon className="icon" />
            <p className="about-text">
              Pay my bills <ArrowForwardIosIcon />{" "}
            </p>
          </div>
        </a>
      </div>

      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default About;
