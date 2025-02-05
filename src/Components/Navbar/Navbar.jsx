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
    <Navbar 
      expand="lg" 
      variant="dark" 
      className="custom-navbar fixed-top" // Added fixed-top and custom class
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="py-0">
          <img
            src={assets.logo}
            alt="MediNexLogo"
            className="logo"
            style={{ height: 'auto', width: '265px' }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center"> {/* Changed alignment */}
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/"
                className={`custom-nav-link mx-2 ${
                  location.pathname === '/' ? 'active-tab' : ''
                }`}
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/services"
                className={`custom-nav-link mx-2 ${
                  location.pathname === '/services' ? 'active-tab' : ''
                }`}
              >
                Services
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/contact"
                className={`custom-nav-link mx-2 ${
                  location.pathname === '/contact' ? 'active-tab' : ''
                }`}
              >
                Contact
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/register"
                className={`custom-nav-link mx-2 ${
                  location.pathname === '/register' ? 'active-tab' : ''
                }`}
              >
                Register
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/login"
                className={`custom-nav-link mx-2 ${
                  location.pathname === '/login' ? 'active-tab' : ''
                }`}
              >
                Login
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Form className="d-flex ms-lg-3 my-2 my-lg-0">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 bg-transparent text-white border-white"
              aria-label="Search"
            />
            <Button 
              variant="outline-light" 
              className="text-white border-white"
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;