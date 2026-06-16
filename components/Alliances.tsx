import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { ROTARY_BLUE, ROTARY_GOLD } from '../constants';

const alliances = [
  { name: "Land Rover", shortName: "Land Rover" },
  { name: "Tesla", shortName: "Tesla" },
  { name: "Omada", shortName: "Omada" },
  { name: "Radisson", shortName: "Radisson" },
  { name: "Smylum", shortName: "Smylum" },
  { name: "LAVISH Salon", shortName: "LAVISH" },
  { name: "Mil Aromas", shortName: "Mil Aromas" }
];

export default function Alliances() {
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="alianzas">
      {/* Decorative background element */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 pointer-events-none transform translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: ROTARY_BLUE }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
             initial={{ opacity: 0, scale: 0.5 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center justify-center p-4 rounded-full mb-6"
             style={{ backgroundColor: `${ROTARY_BLUE}10`, color: ROTARY_BLUE }}
          >
            <Users className="w-12 h-12" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: ROTARY_BLUE }}
          >
            Nuestras Alianzas
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-1 w-24 mx-auto rounded-full"
            style={{ backgroundColor: ROTARY_GOLD }}
          ></motion.div>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Trabajamos de la mano con grandes marcas y organizaciones para multiplicar nuestro impacto positivo en el mundo.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 items-center mt-12">
          {alliances.map((alliance, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl p-8 flex items-center justify-center w-48 h-32 group"
            >
              <span 
                className="text-xl font-bold tracking-wider text-gray-400 group-hover:text-gray-800 transition-colors uppercase text-center"
              >
                {alliance.shortName}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
