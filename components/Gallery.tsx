import React, { useState, useEffect, useRef } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { GalleryItem } from '../types';
import { Instagram, Loader2, ChevronLeft, ChevronRight, ExternalLink, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/get-gallery');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("Using fallback data due to:", err);
        setItems(GALLERY_ITEMS); // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (loading || items.length === 0 || isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000); // Rotate every 4 seconds
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, loading, items.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) {
      handleNext();
    } else if (info.offset.x > 50) {
      handlePrev();
    }
  };

  // Carousel Logic
  const getCardStyle = (index: number) => {
    const total = items.length;
    if (total === 0) return {};
    
    // Calculate circular distance
    let diff = (index - activeIndex) % total;
    // Normalize diff to be shortest path (e.g., -1 instead of total-1)
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isActive = diff === 0;
    
    // Visual Configuration
    // xOffset: How far apart cards are (percentage of card width effectively)
    // We use a fixed pixel + percentage mix for responsiveness
    
    // Determine visibility (hide items far away for performance/visuals)
    const isVisible = Math.abs(diff) <= 2; 

    return {
      isActive,
      isVisible,
      diff
    };
  };

  return (
    <section id="gallery" className="py-24 relative bg-slate-50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
           <motion.h2 
             className="text-4xl md:text-5xl font-black mb-4 text-slate-800"
             initial={{ opacity: 0, y: -20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             Galería <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">Interactiva</span>
           </motion.h2>
           <motion.p 
             className="text-slate-600 text-lg max-w-2xl mx-auto"
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
           >
             Explora nuestros mejores momentos en una experiencia inmersiva.
           </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
          </div>
        ) : (
          <div 
            className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center perspective-[1200px]" 
            ref={containerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode='popLayout'>
              {items.map((item, index) => {
                const { isActive, isVisible, diff } = getCardStyle(index);
                
                // If strictly hide non-visible, we can return null, but for animations it's better to keep them
                // We'll just animate opacity/scale to 0 for far items.
                
                return (
                  <motion.div
                    key={item.id}
                    className={`absolute rounded-3xl overflow-hidden shadow-2xl glass-panel border-[1px] border-white/40 cursor-pointer ${isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                    style={{
                      width: 'min(90vw, 400px)',
                      height: 'min(120vw, 500px)',
                      transformStyle: 'preserve-3d',
                    }}
                    initial={false}
                    animate={{
                      x: `${diff * 60}%`, // Moves left/right
                      scale: 1 - Math.abs(diff) * 0.15, // Scales down further items
                      rotateY: diff * -35, // 3D rotation
                      z: Math.abs(diff) * -100, // Depth
                      zIndex: 100 - Math.abs(diff),
                      opacity: isVisible ? (isActive ? 1 : 0.6) : 0,
                      filter: isActive ? 'blur(0px)' : 'blur(4px) brightness(0.8)',
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 20,
                      mass: 1
                    }}
                    onClick={() => handleCardClick(index)}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={onDragEnd}
                  >
                    {/* Image */}
                    <div className="w-full h-full relative">
                      <img 
                        src={item.imageUrl} 
                        alt={item.caption} 
                        className="w-full h-full object-cover pointer-events-none" 
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-60"></div>

                      {/* Content Overlay (Only visible when near center) */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white transform translate-z-10">
                        <motion.div
                           animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                           transition={{ duration: 0.4 }}
                        >
                          <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight drop-shadow-md">
                            {item.caption}
                          </h3>
                          
                          {item.isInstagram && (
                            <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm tracking-wide mt-3">
                              <Instagram size={16} />
                              <span>INSTAGRAM</span>
                              <ExternalLink size={14} />
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </div>

                    {/* Reflection Effect (Visual Polish) */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none mix-blend-overlay"></div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {/* Controls */}
            <div className="absolute bottom-4 md:bottom-10 flex items-center gap-6 z-[200]">
               <button 
                 onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                 className="p-4 rounded-full bg-white/80 backdrop-blur-md shadow-lg text-slate-800 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
               >
                 <ChevronLeft size={24} />
               </button>
               
               <button
                 onClick={(e) => { e.stopPropagation(); setIsPaused(!isPaused); }}
                 className="p-3 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-600 transition-colors"
               >
                 {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
               </button>

               <button 
                 onClick={(e) => { e.stopPropagation(); handleNext(); }}
                 className="p-4 rounded-full bg-white/80 backdrop-blur-md shadow-lg text-slate-800 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
               >
                 <ChevronRight size={24} />
               </button>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8">
           <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-liquid text-blue-900 font-bold hover:bg-white transition-all shadow-md hover:shadow-xl hover:-translate-y-1"
           >
              <Instagram size={20} />
              <span>Ver todo en Instagram</span>
           </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;