import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Star, Heart, Users, Smile, Sun, CheckCircle2 } from 'lucide-react';
import { ROTARY_BLUE, ROTARY_GOLD } from '../constants';

const services = [
  "Africam",
  "Flexzone",
  "Cinemex",
  "Camaronada",
  "Sweateres",
  "Becas musicales",
  "Tesla event",
  "F.R McDonald's",
  "Inflable CR Barroco",
  "Tianguistengo 50 despensas Ropa",
  "Apoyamos a madres de la sierra norte",
  "Becar a un muchacho",
  "Lecheton",
  "Asilo Yermo y Parres",
  "Asilo Vivir de Amor",
  "Equinoterapia",
  "Canoterapia",
  "Bicla niñas",
  "Jornada salud dental",
  "Camaroniza"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const itemRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

export default function ServicesList() {
  return (
    <section className="py-20 relative bg-slate-50 overflow-hidden" id="servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-2"
            style={{ color: ROTARY_BLUE }}
          >
            Acciones de Servicio
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold mb-6"
            style={{ color: ROTARY_GOLD }}
          >
            2025 - 2026
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-1 w-24 mx-auto rounded-full"
            style={{ backgroundColor: ROTARY_GOLD }}
          ></motion.div>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Nuestro compromiso con la comunidad se refleja en cada una de nuestras iniciativas a lo largo del año.
          </p>
        </div>

        <div className="relative">
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 rounded-full" />
          
          {/* Line for Mobile */}
          <div className="md:hidden absolute left-8 top-0 h-full w-1 bg-gray-200 rounded-full" />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-8 md:gap-12 py-8"
          >
            {services.map((service, index) => {
              const icons = [HeartHandshake, Heart, Users, Smile, Sun, CheckCircle2, Star];
              const Icon = icons[index % icons.length];
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative flex items-center md:justify-center w-full">
                  {/* Timeline Node */}
                  <div 
                    className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white shadow-md z-10 flex items-center justify-center bg-white"
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: ROTARY_GOLD }} />
                  </div>

                  {/* Desktop Layout: Alternating left/right. Mobile Layout: Always right */}
                  <div className={`w-full flex ${isEven ? 'md:justify-end' : 'md:justify-start'} ml-20 md:ml-0`}>
                    <motion.div
                      variants={isEven ? itemRightVariants : itemLeftVariants}
                      className={`w-full md:w-[45%] ${isEven ? 'md:pl-12' : 'md:pr-12'}`}
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex items-center gap-4 group">
                        <div 
                          className="p-4 rounded-xl flex-shrink-0 transition-colors"
                          style={{ backgroundColor: `${ROTARY_BLUE}10`, color: ROTARY_BLUE }}
                        >
                          <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-400 mb-1">
                            # {String(index + 1).padStart(2, '0')}
                          </div>
                          <h3 className="font-semibold text-gray-800 text-lg md:text-xl leading-tight">
                            {service}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
