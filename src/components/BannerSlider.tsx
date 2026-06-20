import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';
import { BANNER_IMAGES } from '../data';

interface BannerSliderProps {
  onExploreClick: () => void;
}

export default function BannerSlider({ onExploreClick }: BannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === BANNER_IMAGES.length - 1 ? 0 : prevIndex + 1
        ),
      5000 // Slides every 5 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? BANNER_IMAGES.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === BANNER_IMAGES.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div id="banner-slider-container" className="relative w-full h-[220px] md:h-[340px] rounded-2xl overflow-hidden shadow-lg group">
      {/* Slides Container */}
      <div 
        className="w-full h-full flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {BANNER_IMAGES.map((banner, index) => (
          <div 
            key={banner.id}
            className="w-full h-full shrink-0 relative bg-slate-950"
          >
            {/* Aspect Ratio matched image */}
            <img
              src={banner.src}
              alt={banner.title}
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[5s] ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Cool Futuristic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-5 md:p-8">
              <div className="max-w-2xl text-left space-y-1.5 md:space-y-3">
                {/* Dynamic badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-amber-400 text-slate-950 shadow-sm animate-pulse">
                  <Sparkles size={10} className="md:size-3" />
                  {banner.badge}
                </div>
                
                {/* Slide Title */}
                <h2 className="text-lg md:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm font-sans">
                  {banner.title}
                </h2>
                
                {/* Slide Subtitle */}
                <p className="text-xs md:text-sm text-slate-200 line-clamp-2 leading-relaxed drop-shadow-sm max-w-lg">
                  {banner.subtitle}
                </p>

                {/* Interactive Action Button inside Slide */}
                <div className="pt-1.5 md:pt-3">
                  <button
                    onClick={onExploreClick}
                    className="px-4 py-1.5 md:px-5 md:py-2 rounded-xl text-xs font-bold bg-blue-500 hover:bg-blue-600 text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md inline-flex items-center gap-1.5"
                  >
                    Mulai Belanja Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrow buttons - Hidden on small mobile, shown on group hover on desktop */}
      <button
        id="prev-slide-btn"
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-3 md:left-4 z-10 p-1.5 md:p-2 rounded-full bg-slate-900/80 hover:bg-blue-500 text-white md:opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-xs"
      >
        <ChevronLeft size={18} className="md:size-5" />
      </button>
      <button
        id="next-slide-btn"
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-3 md:right-4 z-10 p-1.5 md:p-2 rounded-full bg-slate-900/80 hover:bg-blue-500 text-white md:opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-xs"
      >
        <ChevronRight size={18} className="md:size-5" />
      </button>

      {/* Indicators (Dots) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {BANNER_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-amber-400 w-5 md:w-6' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Tiny Timer indicator bar (Visual Bergerak) */}
      <div 
        key={currentIndex}
        className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400/90 animate-timer-bar-run"
      />
    </div>
  );
}
