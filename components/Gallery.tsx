import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { GalleryItem } from '../types';
import { Instagram, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Nuestra Galería</h2>
          <div className="flex items-center justify-center gap-2 text-yellow-600">
             <Instagram size={20} />
             <a href="https://instagram.com" target="_blank" rel="noreferrer" className="font-semibold tracking-wide hover:underline">@clubrotariopueblavivo</a>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-xl glass-panel cursor-pointer shadow-md"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white text-sm font-medium line-clamp-2">{item.caption}</p>
                  {item.isInstagram && (
                    <div className="flex items-center gap-1 text-xs text-yellow-400 mt-2">
                      <Instagram size={12} />
                      <span>Ver en Instagram</span>
                    </div>
                  )}
                </div>
                
                {item.isInstagram && item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label="View on Instagram"></a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
