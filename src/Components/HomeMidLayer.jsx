import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const handleRegisterClick = (href) => {
    console.log('Navigating to:', href);
    navigate(href);
  };

  const accordionContent = {
    zoom: (
      <>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Consultations via Zoom</Accordion.Header>
          <Accordion.Body>
            Connect with experienced doctors online through secure Zoom consultations. Get medical advice from the comfort of your home.
          </Accordion.Body>
        </Accordion.Item>
      </>
    ),
    visiting: (
      <>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Visiting Doctors</Accordion.Header>
          <Accordion.Body>
            Schedule an in-person visit with our doctors for thorough check-ups and personalized medical care at your preferred location.
          </Accordion.Body>
        </Accordion.Item>
      </>
    ),
    nursing: (
      <>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Nursing Assistance & Reports</Accordion.Header>
          <Accordion.Body>
            Our trained nurses provide home-based care, monitoring patient progress, and sharing health updates with doctors for better treatment.
          </Accordion.Body>
        </Accordion.Item>
      </>
    ),
  };

  return (
    <div className="Medinexus-Services">
        <div><h1 style={{ 
            fontSize:'6vw',
            fontWeight:'bold',
            textAlign:'center',
            marginTop:'40px',
            marginBottom:'20px'
         }}>How do we Treat ?</h1></div>
      <Container className="my-4">
        <Row className="g-4 justify-content-center">
          {[
            { id: 1, title: 'Zoom Consultations', image: 'zoom-image-url', accordion: accordionContent.zoom, href: '' },
            { id: 2, title: 'Visiting Doctors', image: 'visiting-doctor-image-url', accordion: accordionContent.visiting, href: '' },
            { id: 3, title: 'Nursing Assistance', image: 'nursing-image-url', accordion: accordionContent.nursing, href: '' },
          ].map((item) => (
            <Col xs={12} sm={6} md={4} key={item.id}>
              <Card className="text-center" style={{ borderRadius: '25px', border: '0.25px solid navy', height: '100%' }}>
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{
                    height: '15rem',
                    objectFit: 'cover',
                    borderTopLeftRadius: '25px',
                    borderTopRightRadius: '25px',
                  }}
                />
                <Card.Body>
                  <Card.Title>
                    <h2 style={{ fontWeight: 'bold' }}>{item.title}</h2>
                  </Card.Title>
                  <Accordion>
                    {item.accordion}
                  </Accordion>
                  <Button
                    variant="primary"
                    className="custom-button mt-3"
                    style={{
                      backgroundColor: hoveredButton === item.id ? '#1642c7' : '#060d24',
                      color: hoveredButton === item.id ? 'black' : '#aeb6d1',
                      fontSize: '25px',
                      fontWeight: '500',
                      width: '200px',
                      height: '55px',
                      borderRadius: hoveredButton === item.id ? '25px' : '25px',
                      transition: 'background-color 0.6s ease',
                      border: hoveredButton === item.id ? '0.5px solid navy' : '0',
                    }}
                    onClick={() => handleRegisterClick(item.href)}
                    onMouseEnter={() => setHoveredButton(item.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    Contact
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Services;
