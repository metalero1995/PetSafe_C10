import { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambiar cada 5 segundos

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div className="relative w-1/2 max-w-4xl mx-auto group">
      <div className="overflow-hidden">
        {images.map((image, index) => (
          <img
            key={image.url}
            src={'http://localhost:8000/'+image.url}
            alt="carousel"
            className={`w-full h-64 object-cover ${index === currentIndex ? 'block' : 'hidden'}`}
          />
        ))}
      </div>

      {/* Botón para ir al slide anterior */}
      <button
        className="absolute left-[5px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 opacity-0 group-hover:opacity-75 hover:opacity-100 rounded-full"
        onClick={prevSlide}
      >
        &#10094;
      </button>

      {/* Botón para ir al siguiente slide */}
      <button
        className="absolute right-[5px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 opacity-0 group-hover:opacity-75 hover:opacity-100 rounded-full"
        onClick={nextSlide}
      >
        &#10095;
      </button>

      {/* Indicadores de los slides */}
      <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-2 rounded-full ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;