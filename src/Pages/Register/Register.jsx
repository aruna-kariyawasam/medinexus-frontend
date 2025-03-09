import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { assets } from '../../assets/assets.js';
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const handleRegisterClick = (href) => {
    console.log('Navigating to:', href); 
    navigate(href); 
  };
  
  return (
    <div style={{ 
      backgroundImage: `url(${assets.login_box_bg})`,
      backgroundAttachment:'scroll',
      backgroundPosition:'center',
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover',
      height: '140vh',
      width:'100%'
     }}>
      <Container className="my-4">
        <Row className="g-4">
          {[
            { id: 1, title: 'Register as a Doctor', image: assets.register_doctor , href: '/docRegi'},
            { id: 2, title: 'Register as a Pharmacist', image: assets.register_pharmacist , href:'/pharmRegi' },
            { id: 3, title: 'Register as a Nurse', image: assets.register_nurse , href:'/nurRegi'},
            { id: 4, title: 'Register as a Patient', image: assets.register_patient , href:'/patRegi' },
          ].map((item) => (
            <Col xs={12} sm={6} md={6} lg={3} key={item.id}>
              <Card
                className="text-center"
                style={{ 
                  borderRadius: '25px',
                  border: '0.25px solid navy',
                  marginTop:'120px'
                }}
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
                    Register
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

export default Register;
