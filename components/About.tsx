import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Decorative background element for this section */}
      <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-blue-500/10 blur-[100px] -z-10 rounded-full mix-blend-multiply"></div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <span className="text-yellow-500 font-bold tracking-widest uppercase text-xs mb-2 block">Nuestra Esencia</span>
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-slate-800 leading-tight">
              Sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Puebla Vivo</span>
            </h2>
            
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
              <p>
                Club Rotario Puebla Vivo es más que una organización; es una red vibrante de 1.4 millones de vecinos, amigos y líderes que ven un mundo donde las personas se unen para crear un cambio duradero.
              </p>
              <p>
                Fundado con la visión de revitalizar el servicio rotario en nuestra ciudad, nos enfocamos en proyectos de alto impacto local, desde la alfabetización y la paz, hasta el agua y la salud.
              </p>
              
              <blockquote className="relative p-6 mt-8 rounded-2xl bg-white/40 border border-white/60 shadow-sm">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-yellow-400 rounded-l-2xl"></div>
                <p className="font-serif italic text-slate-800 text-xl">
                  "Dar de sí antes de pensar en sí"
                </p>
                <footer className="mt-2 text-sm text-slate-500 font-bold uppercase tracking-wide">
                  — Lema Rotario
                </footer>
              </blockquote>
            </div>
          </motion.div>

          {/* Right Column: Video Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden glass-liquid shadow-2xl border border-white/50 group">
              
              {/* Video Wrapper (16:9 Aspect Ratio) */}
              <div className="relative pt-[56.25%] bg-slate-900">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/52178335?si=genericRotaryVideo&autoplay=0&controls=1&rel=0" 
                  title="Rotary Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
                
                {/* Optional Overlay (Hidden when playing usually, but iframe handles it) 
                    If you used a local <video>, you'd use a poster image and a custom play button overlay here.
                */}
              </div>

              {/* Decorative Frame Elements */}
              <div className="absolute inset-0 border-[6px] border-white/20 rounded-3xl pointer-events-none"></div>
              
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400/20 blur-2xl rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full -z-10"></div>
            </div>

            {/* Caption/Context under video */}
            <div className="mt-6 flex items-start gap-4 p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40">
              <div className="p-3 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-500/30 shrink-0">
                <Play size={20} fill="currentColor" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Conoce nuestra misión</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Descubre cómo los rotarios de todo el mundo toman acción para solucionar los problemas más urgentes.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;