import { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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
      if (images?.length > 1) {
        nextSlide();
      }
    }, 5000); // Cambiar cada 5 segundos

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  // Detectar movimiento de swipe
  const handleTouchStart = (e) => {
    e.stopPropagation();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe izquierda
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe derecha
      prevSlide();
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto group">
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images?.length > 1 ? (
          <div
            className="whitespace-nowrap transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={image.url}
                src={image.url}
                alt="carousel"
                className="w-full h-96 object-cover inline-block"
                draggable="false"
              />
            ))}
          </div>
        ) : (
          <img
            src={images[0]?.url}
            alt="carousel"
            className="w-full h-64 object-cover"
          />
        )}
      </div>

      {/* Botón para ir al slide anterior */}
      {images?.length > 1 && (
        <>
          <button
            className="absolute left-[5px] top-1/2 transform -translate-y-1/2 bg-white text-black px-4 py-2 opacity-0 group-hover:opacity-75 hover:opacity-100 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
          >
            &#10094;
          </button>

          <button
            className="absolute right-[5px] top-1/2 transform -translate-y-1/2 bg-white text-black px-4 py-2 opacity-0 group-hover:opacity-75 hover:opacity-100 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
          >
            &#10095;
          </button>
        </>
      )}

      {/* Indicadores de los slides */}
      {images?.length > 1 && (
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
      )}
    </div>
  );
};

export default Carousel;
