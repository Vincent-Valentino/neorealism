import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { TitleSlide, HistoricalContextSlide, KeyCharacteristicsSlide, LandmarkFilmsSlide, ImpactLegacySlide, NeorealismDeclineSlide, ConclusionSlide } from './titleslide.jsx';

const ItalianNeorealismCarousel = () => {
  const slides = [
    { content: <TitleSlide /> },
    { content: <HistoricalContextSlide /> },
    { content: <KeyCharacteristicsSlide /> },
    { content: <LandmarkFilmsSlide /> },
    { content: <ImpactLegacySlide /> },
    { content: <NeorealismDeclineSlide /> },
    { content: <ConclusionSlide /> },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div style={{ fontFamily: 'Garamond' }} className="relative w-full h-screen overflow-hidden">
      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
      >
        <ChevronLeft size={48} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
      >
        <ChevronRight size={48} />
      </button>
      
      {/* Italian flag element */}
      <motion.div
        className="absolute top-4 left-4 w-12 h-8 bg-white z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-y-0 left-0 w-1/3 bg-green-600"></div>
        <div className="absolute inset-y-0 right-0 w-1/3 bg-red-600"></div>
      </motion.div>
      
      {/* Slide counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg z-10">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Slide display */}
      <div className="h-full w-full">
        {slides[currentSlide].content}
      </div>
    </div>
  );
};

export default ItalianNeorealismCarousel;