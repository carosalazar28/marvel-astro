import React, { useMemo, useState } from 'react';
import CountdownTimer from './CountdownTimer';
import '../styles/slider.css';

interface SliderProps {
  slides: Array<{
    id: number;
    title: string;
    targetDate: string;
  }>;
}

export default function SliderCountdown({ slides }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = useMemo(() => slides.length, [slides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev === 0 ? totalSlides - 1 : prev - 1;
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev === totalSlides - 1 ? 0 : prev + 1;
      return newIndex;
    });
  };

  const goToSlide = (index: number) => {
    console.log('Go to slide:', index);
    setCurrentIndex(index);
  };

  const getPrevIndex = () => {
    return currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
  };

  const getNextIndex = () => {
    return currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
  };

  return (
    <div className="slider">
      <div className="slider__container">
        {/* Previous Slide */}
        <div className="slider__slide slider__slide--prev">
          <div className="slider__card" key={`prev-${getPrevIndex()}`}>
            <CountdownTimer 
              title={slides[getPrevIndex()].title} 
              targetDate={slides[getPrevIndex()].targetDate} 
              isCurrent={false}
            />
          </div>
        </div>

        {/* Current Slide */}
        <div className="slider__slide slider__slide--current">
          <div className="slider__card slider__card--active" key={`current-${currentIndex}`}>
            <CountdownTimer 
              title={slides[currentIndex].title} 
              targetDate={slides[currentIndex].targetDate} 
              isCurrent={true}
            />
          </div>
        </div>

        {/* Next Slide */}
        <div className="slider__slide slider__slide--next">
          <div className="slider__card" key={`next-${getNextIndex()}`}>
            <CountdownTimer 
              title={slides[getNextIndex()].title} 
              targetDate={slides[getNextIndex()].targetDate} 
              isCurrent={false}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <button 
          className="slider__button slider__button--prev"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          PREV
        </button>

        <button 
          className="slider__button slider__button--next"
          onClick={handleNext}
          aria-label="Next slide"
        >
          NEXT
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="slider__pagination">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`slider__dot ${
              index === currentIndex ? 'slider__dot--active' : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};