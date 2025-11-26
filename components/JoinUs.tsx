import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Globe } from 'lucide-react';

const JoinUs: React.FC = () => {
  return (
    <section id="join" className="relative py-32 overflow-hidden flex items-center justify-center">
      {/* Fixed Parallax Background */}
      <div 
        className="absolute inset-0 bg-fixed bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop')" 
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Sé Gente de Acción</h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
            Tus habilidades y pasión pueden hacer la diferencia. Únete a Club Rotario Puebla Vivo y forma parte de la solución a los retos de nuestra comunidad.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <Heart className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Servicio</h3>
              <p className="text-sm text-blue-100">Participa en proyectos que cambian vidas localmente.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <Users className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Amistad</h3>
              <p className="text-sm text-blue-100">Conecta con líderes profesionales y haz amigos para toda la vida.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <Globe className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Impacto Global</h3>
              <p className="text-sm text-blue-100">Sé parte de una red internacional dedicada a la paz mundial.</p>
            </div>
          </div>

          <a 
            href="mailto:info@rotarypueblavivo.org"
            className="inline-block px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-yellow-500/20 text-lg"
          >
            Quiero ser Socio
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinUs;