import React from 'react';
import PropTypes from 'prop-types';

const ExampleCarouselImage = ({ imageUrl, altText }) => {
  return (
    <div 
      className="carousel-image-container"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh'
      }}
      aria-label={altText}
    />
  );
};

ExampleCarouselImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired
};

export default ExampleCarouselImage;