import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { assets } from '../../assets/assets';

function NavScrollExample() {
  return (
    <Navbar expand="lg" bg="light" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
          <img 
          src={assets.logo} 
          alt="MediNexLogo" 
          className="logo"
        style={{ height: 'auto', width: '265px' }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            variant="tabs"
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
              
            <Nav.Link href="/" >Home</Nav.Link>
            <Nav.Link href="/services">Services</Nav.Link>
            <Nav.Link href="#action3">Pharmacy</Nav.Link>
            <Nav.Link href="#action4">Doctor</Nav.Link>
            <Nav.Link href="#action5">Nursing</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"/>

            <Button variant="outline-success">Search</Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;