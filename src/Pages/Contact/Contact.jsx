import React, { useState } from 'react';
import './Contact.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { assets } from '../../assets/assets';
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const handleRegisterClick = (href) => {
    console.log('Navigating to:', href); 
    navigate(href); 
  };
  
  return (
    <div>
      <Container className="my-4">
        <Row className="g-4" 
      style={{ 
        marginTop:'100px'
       }}>
          {[
            { id: 1, title: 'Contact an Admin', image: assets.contact_admin , href:'' },
            // { id: 2, title: 'Contact a Doctor', image: assets.contact_doctor , href: ''},
            // { id: 3, title: 'Contact a Pharmacist', image: assets.contact_pharmacist , href:'' },
            // { id: 4, title: 'Contact a Nurse', image: assets.contact_nurse , href:''},
          ].map((item) => (
            <Col xs={12} sm={6} md={6} lg={3} key={item.id}>
              <Card
                className="text-center"
                style={{ borderRadius: '25px', border: '0.25px solid navy' }}
              >
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ height: '15rem', objectFit: 'cover', borderRadius: '25px' }}
                />
                <Card.Body>
                  <Card.Title>
                    <h2 style={{ fontWeight: 'bold' }}>{item.title}</h2>
                  </Card.Title>
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
}

export default Contact
