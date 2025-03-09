import React from 'react';
import './Header.css';
import { assets } from '../../assets/assets';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../../components/ExampleCarouselImage';

const Header = () => {
  return (
    <div className="header">
      <Carousel>
        <Carousel.Item>
          <ExampleCarouselImage 
            imageUrl={assets.image_01} 
            altText="First slide"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Welcome to MediNexus</h3>
            <p>Empowering healthcare connections for a healthier tomorrow.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <ExampleCarouselImage 
            imageUrl={assets.image_02} 
            altText="Second slide"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Quality Care</h3>
            <p>Providing the best healthcare services for all.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <ExampleCarouselImage 
            imageUrl={assets.image_03} 
            altText="Third slide"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Innovative Solutions</h3>
            <p>Transforming healthcare with cutting-edge technology.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <ExampleCarouselImage 
            imageUrl={assets.image_04} 
            altText="Fourth slide"
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Your Health, Our Priority</h3>
            <p>Committed to delivering exceptional care and support.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Header;