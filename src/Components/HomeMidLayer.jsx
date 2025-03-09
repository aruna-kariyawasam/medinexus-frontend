import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';

const Services = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const handleRegisterClick = (href) => {
    console.log('Navigating to:', href);
    navigate(href);
  };

  return (
    <div className="Medinexus-Services">
      <div>
        <h1 style={{ 
            fontSize: '6vw',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '40px',
            marginBottom: '20px'
         }}>
          How do we Treat?
        </h1>
      </div>
      <Container className="my-4">
        <Row className="g-4 justify-content-center">
          {[
            { id: 1, title: 'Zoom Consultations', image: assets.zoomConsultation, accordionItems: [
              { key: "0", header: "Consultations via Zoom", body: "Connect with experienced doctors online through secure Zoom consultations. Get medical advice from the comfort of your home." }
            ]},
            { id: 2, title: 'Visiting Doctors', image: assets.doctorVisiting, accordionItems: [
              { key: "0", header: "Visiting Doctors", body: "Schedule an in-person visit with our doctors for thorough check-ups and personalized medical care at your preferred location." }
            ]},
            { id: 3, title: 'Nursing Assistance', image: assets.nursingAssistance, accordionItems: [
              { key: "0", header: "Nursing Assistance & Reports", body: "Our trained nurses provide home-based care, monitoring patient progress, and sharing health updates with doctors for better treatment." }
            ]},
          ].map((item) => {
            const [activeKey, setActiveKey] = useState(null);

            return (
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
                    <Accordion activeKey={activeKey} onSelect={(e) => setActiveKey(e === activeKey ? null : e)}>
                      {item.accordionItems.map((accordionItem) => (
                        <Accordion.Item eventKey={accordionItem.key} key={accordionItem.key}>
                          <Accordion.Header>{accordionItem.header}</Accordion.Header>
                          <Accordion.Body>{accordionItem.body}</Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Services;
