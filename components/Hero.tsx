import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg-latest.png"
          alt="Volunteers hands together"
          className="w-full h-full object-cover"
        />
        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-slate-50/90 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-white/50"></div>
      </div>

      <div className="container mx-auto px-6 text-center z-10 relative mt-16">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-2 px-6 rounded-full glass-liquid border border-blue-100 text-blue-800 text-sm font-bold mb-6 tracking-widest uppercase shadow-sm">
            Club Rotario Puebla Vivo
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-8xl font-black mb-6 text-slate-800 leading-[0.9] tracking-tight"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Servir para <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
            Cambiar Vidas
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-slate-700 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Uniendo líderes, intercambiando ideas y tomando acción para mejorar nuestra comunidad en Puebla y el mundo.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#directory" className="px-10 py-4 rounded-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold transition-all transform hover:scale-105 shadow-xl shadow-yellow-400/20 text-lg">
            Conoce a los Socios
          </a>
          <a href="#about" className="px-10 py-4 rounded-full glass-liquid text-slate-800 hover:bg-white font-bold transition-all border border-white/60 hover:shadow-xl text-lg">
            Sobre Nosotros
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};

export default Hero;