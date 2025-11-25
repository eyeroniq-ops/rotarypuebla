import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-6 text-center z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-2 px-6 rounded-full bg-white/80 border border-blue-100 text-blue-700 text-sm font-bold mb-6 tracking-widest uppercase shadow-sm backdrop-blur-sm">
            Club Rotario Puebla Vivo
          </span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 text-slate-800 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Servir para <br />
          <span className="rotary-gradient-text">Cambiar Vidas</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 font-medium"
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
          <a href="#directory" className="px-8 py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold transition-all transform hover:scale-105 shadow-lg shadow-yellow-400/30">
            Conoce a los Socios
          </a>
          <a href="#about" className="px-8 py-3 rounded-full glass-panel text-slate-700 hover:bg-white/90 font-bold transition-all border border-white/60 hover:shadow-lg">
            Sobre Nosotros
          </a>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-blue-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};

export default Hero;