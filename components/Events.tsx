import React, { useState, useEffect } from 'react';
import { UPCOMING_EVENTS } from '../constants';
import { Event } from '../types';
import { MapPin, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import SuperBowlPoll from './SuperBowlPoll';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  }
};

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/get-events');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Using fallback data due to:", err);
        setEvents(UPCOMING_EVENTS); // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Próximos Eventos</h2>
            <p className="text-slate-600 max-w-xl text-lg">
              Participa en nuestras actividades y ayúdanos a recaudar fondos para nuestras causas.
            </p>
          </motion.div>
          <motion.div
            className="hidden md:flex items-center gap-2 text-blue-600 font-semibold mt-4 md:mt-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>Calendario Oficial</span> <ArrowRight size={18} />
          </motion.div>
        </div>

        <div className="mb-16">
          <SuperBowlPoll />
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {events.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="glass-panel rounded-3xl overflow-hidden transition-shadow duration-300 flex flex-col group h-full hover:shadow-xl transform-gpu"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md rounded-xl px-4 py-2 shadow-sm text-center min-w-[70px] border border-white/50">
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wide">{event.date.split(' ')[1]}</span>
                    <span className="block text-2xl font-bold text-blue-600 leading-none">{event.date.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-3 mb-5 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-full bg-blue-50 text-blue-500">
                        <Clock size={14} />
                      </div>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-full bg-blue-50 text-blue-500">
                        <MapPin size={14} />
                      </div>
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-8 text-center md:hidden">
          <div className="inline-flex items-center gap-2 text-blue-600 font-semibold">
            <span>Calendario Oficial</span> <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;