import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const PreviousArrow = ({ onClick }) => (
  <div
    className="text-white absolute left-[3px] top-1/2 transform -translate-y-1/2 bg-gray-500 rounded-full px-4 py-2 cursor-pointer z-10"
    onClick={onClick}
  >
    &#10094; {/* Código de flecha izquierda */}
  </div>
);

// Componente personalizado para la flecha siguiente
const NextArrow = ({ onClick }) => (
  <div
    className="text-white absolute right-[3px] top-1/2 transform -translate-y-1/2 bg-gray-500 rounded-full px-4 py-2 cursor-pointer z-10"
    onClick={onClick}
  >
    &#10095; {/* Código de flecha derecha */}
  </div>
);

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div 
      className="w-full"
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} style={{ position: 'relative', paddingTop: '56.25%' }}>
            <img
              src={"http://localhost:8000/"+image.url}
              alt={`Slide ${index + 1}`}
              className="w-full h-72 object-fill rounded-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
