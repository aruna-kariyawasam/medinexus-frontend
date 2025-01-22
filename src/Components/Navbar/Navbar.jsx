import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { assets } from '../../assets/assets';
import './Navbar.css'; 

function NavScrollExample() {
  const location = useLocation();

  return (
    <Navbar expand="lg" bg="light" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={assets.logo}
            alt="MediNexLogo"
            className="logo"
            style={{ height: 'auto', width: '265px' }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            variant="tabs"
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
            <Nav.Link
              as={Link}
              to="/"
              className={`custom-nav-link ${
                location.pathname === '/' ? 'active-tab' : ''
              }`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/services"
              className={`custom-nav-link ${
                location.pathname === '/services' ? 'active-tab' : ''
              }`}
            >
              Services
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className={`custom-nav-link ${
                location.pathname === '/contact' ? 'active-tab' : ''
              }`}
            >
              Contact
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/register"
              className={`custom-nav-link ${
                location.pathname === '/register' ? 'active-tab' : ''
              }`}
            >
              Register
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/login"
              className={`custom-nav-link ${
                location.pathname === '/login' ? 'active-tab' : ''
              }`}
            >
              Login
            </Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
