import React from 'react';

const ImageComponent = ({ image }) => {
  return (
      <img src={image} alt="Base64"
        style={{ width: '50px', height: '50px' }} />
  );
};

export default ImageComponent;