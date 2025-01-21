import './Services.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { assets } from '../../assets/assets';
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const handleRegisterClick = (href) => {
    console.log('Navigating to:', href);
    navigate(href);
  };

  const accordionContent = {
    doctor: (
      <>
        <Accordion.Item eventKey="0">
          <Accordion.Header>General Consultations</Accordion.Header>
          <Accordion.Body>
            Our doctors provide consultations for a wide range of health issues, ensuring personalized care and treatment.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Specialist Referrals</Accordion.Header>
          <Accordion.Body>
            Get referred to the best specialists for advanced treatment in areas like cardiology, neurology, and orthopedics.
          </Accordion.Body>
        </Accordion.Item>
      </>
    ),
    pharmacy: (
      <>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Prescription Medicines</Accordion.Header>
          <Accordion.Body>
            Order prescription medicines online and get them delivered to your doorstep with accuracy and safety.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Over-the-Counter Products</Accordion.Header>
          <Accordion.Body>
            Browse and purchase a variety of OTC health products, including vitamins, supplements, and personal care items.
          </Accordion.Body>
        </Accordion.Item>
      </>
    ),
    nursing: (
      <>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Home Nursing Services</Accordion.Header>
          <Accordion.Body>
            Professional nursing services for post-operative care, elderly care, and chronic disease management at home.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Hospital Assistance</Accordion.Header>
          <Accordion.Body>
            Skilled nursing assistance for in-patient care, ensuring proper treatment and recovery in hospitals.
          </Accordion.Body>
        </Accordion.Item>
      </>
    ),
  };

  return (
    <div className="Medinexus-Services">
      <Container className="my-4">
        <Row className="g-4 justify-content-center">
          {[
            { id: 1, title: 'Doctor Services', image: assets.contact_doctor, accordion: accordionContent.doctor, href: '' },
            { id: 2, title: 'Pharmacy Services', image: assets.contact_pharmacist, accordion: accordionContent.pharmacy, href: '' },
            { id: 3, title: 'Nursing Services', image: assets.contact_nurse, accordion: accordionContent.nursing, href: '' },
          ].map((item) => (
            <Col xs={12} sm={6} md={4} key={item.id}>
              <Card
                className="text-center"
                style={{ borderRadius: '25px', border: '0.25px solid navy', height: '100%' }}
              >
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
