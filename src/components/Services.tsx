import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import { ROTARY_SERVICES } from '../../constants';

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (ROTARY_SERVICES.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ROTARY_SERVICES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + ROTARY_SERVICES.length) % ROTARY_SERVICES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ROTARY_SERVICES.length);
  };

  if (ROTARY_SERVICES.length === 0) return null;

  return (
    <section id="services" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-xl border border-white/10 mb-6 group hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300">
            <span className="text-yellow-500 mr-2">
              <Briefcase size={24} />
            </span>
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm">
              Nuestras Obras
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Servicios que ha hecho <span className="text-yellow-500">Rotary</span>
          </h2>
          <p className="text-xl text-gray-400">
            Conoce el impacto que hemos generado en nuestra comunidad a través de nuestras iniciativas y proyectos.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div className="overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {ROTARY_SERVICES.map((service) => (
                <div key={service.id} className="min-w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-64 sm:h-96 lg:h-full min-h-[400px]">
                      <img 
                        src={service.imageUrl} 
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/90 hidden lg:block" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col justify-center p-8 lg:p-16 h-full relative">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-500 text-sm font-semibold rounded-full border border-yellow-500/20">
                          Proyecto Rotario
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls (show if > 1 item) */}
          {ROTARY_SERVICES.length > 1 && (
            <>
              <button 
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-yellow-500 text-white rounded-full backdrop-blur-sm border border-white/10 transition-colors duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-yellow-500 text-white rounded-full backdrop-blur-sm border border-white/10 transition-colors duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {ROTARY_SERVICES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-yellow-500 w-8' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
