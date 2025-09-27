// src/components/Carousel.jsx
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({
  items = [],
  renderItem,
  visibleCount = 1, // default: 1 item (like Hero Banner)
  autoSlide = false,
  interval = 5000,
  className = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    if (!autoSlide || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === items.length - 1 ? 0 : prev + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoSlide, items.length, interval]);

  // Navigation
  const handleNext = () => {
    if (visibleCount === 1) {
      setCurrentIndex((prev) =>
        prev === items.length - 1 ? 0 : prev + 1
      );
    } else if (currentIndex + visibleCount < items.length) {
      setCurrentIndex(currentIndex + visibleCount);
    }
  };

  const handlePrev = () => {
    if (visibleCount === 1) {
      setCurrentIndex((prev) =>
        prev === 0 ? items.length - 1 : prev - 1
      );
    } else if (currentIndex - visibleCount >= 0) {
      setCurrentIndex(currentIndex - visibleCount);
    }
  };

  // Slice for multi-view (like Shop by Pet)
  const visibleItems =
    visibleCount === 1
      ? [items[currentIndex]]
      : items.slice(currentIndex, currentIndex + visibleCount);

  return (
    <div className={`relative ${className}`}>
      {/* Content */}
      <div className="flex items-center justify-center gap-4">
        {/* Left Arrow */}
        {items.length > visibleCount && (
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white p-2 rounded-full shadow"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Items */}
        {visibleCount === 1 ? (
          // Single item mode (Hero Banner style)
          <div className="overflow-hidden rounded-md shadow">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="min-w-full flex-shrink-0 relative"
                >
                  {renderItem(item, idx)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Multi-item mode (Pets carousel)
          <div className="grid grid-cols-5 gap-6 flex-1">
            {visibleItems.map((item, idx) => (
              <div key={idx}>{renderItem(item, idx)}</div>
            ))}
          </div>
        )}

        {/* Right Arrow */}
        {items.length > visibleCount && (
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white p-2 rounded-full shadow"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Dots for single-item mode */}
      {visibleCount === 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === idx ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
