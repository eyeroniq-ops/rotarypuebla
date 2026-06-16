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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ServicesList() {
  return (
    <section className="py-20 relative bg-slate-50" id="servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: ROTARY_BLUE }}
          >
            Acciones de Servicio
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-1 w-24 mx-auto rounded-full"
            style={{ backgroundColor: ROTARY_GOLD }}
          ></motion.div>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Nuestro compromiso con la comunidad se refleja en cada una de nuestras iniciativas y apoyos.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            // Assigning a random-looking but deterministic icon
            const icons = [HeartHandshake, Heart, Users, Smile, Sun, CheckCircle2, Star];
            const Icon = icons[index % icons.length];

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex items-start gap-4 group"
              >
                <div 
                  className="p-3 rounded-lg flex-shrink-0 transition-colors"
                  style={{ backgroundColor: `${ROTARY_GOLD}15`, color: ROTARY_GOLD }}
                >
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg leading-tight mt-1">
                    {service}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
