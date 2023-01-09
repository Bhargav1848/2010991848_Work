import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
// import NavDropdown from "react-bootstrap/NavDropdown";
import "../Styles/navbar.css";
import React from "react";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar" bg="light">
      <Container fluid>
        <Navbar.Brand href="/">
          <b>Lifecare.com</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>

            <Nav.Link href="/Contacts">
              <AddIcCallIcon /> 091-276-245 | Contact
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Link to="/Login">
              <Button variant="outline-primary">Login</Button>
            </Link>
            &nbsp;&nbsp;
            <Link to="/Register">
              <Button variant="outline-primary">Register</Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
