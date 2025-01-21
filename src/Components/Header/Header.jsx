import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';


const Header = () => {
  return (
    <div>
        <div className="header">
            <video autoPlay loop muted className="header-video">
                <source src={assets.home_bg_video} type="video/mp4" fluid/>
            </video>

            <div className="header-overlay">
                <div className="header-content">
                    <h1 className="wel-note">Welcome to MediNexus</h1>
                    <p className="wel-pargraph">Empowering healthcare connections for a healthier tomorrow.</p>
                </div>
            </div>
            
            <div className="overlay-images">
                <Container>
                    <Row>
                        <Col xs={6} md={3}>
                        <Image src={assets.image_01} className="image-item" />
                        </Col>
                        <Col xs={6} md={3}>
                        <Image src={assets.image_02} className="image-item" />
                        </Col>
                        <Col xs={6} md={3}>
                        <Image src={assets.image_03} className="image-item" />
                        </Col>
                        <Col xs={6} md={3}>
                        <Image src={assets.image_04} className="image-item" />
                        </Col>
                    </Row>
                </Container>
            </div>
          </div>
    </div>
  )
}

export default Header
