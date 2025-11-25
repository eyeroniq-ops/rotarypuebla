import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Award } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div 
    className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/90 transition-colors shadow-sm"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="p-4 rounded-full bg-gradient-to-br from-blue-50 to-white border border-blue-100 mb-4 text-blue-600 shadow-sm">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
    <p className="text-slate-600 text-sm">{description}</p>
  </motion.div>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">
              Sobre <span className="text-blue-600">Puebla Vivo</span>
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
              <p>
                Club Rotario Puebla Vivo es parte de una red global de 1.4 millones de vecinos, amigos, líderes y solucionadores de problemas que ven un mundo donde las personas se unen y toman acción para crear un cambio duradero.
              </p>
              <p>
                Fundado con la visión de revitalizar el servicio rotario en nuestra ciudad, nos enfocamos en proyectos de alto impacto local, desde la alfabetización y la paz, hasta el agua y la salud.
              </p>
              <p className="font-semibold text-slate-800 border-l-4 border-yellow-400 pl-4 italic bg-white/50 py-2 rounded-r-lg">
                "Dar de sí antes de pensar en sí"
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard 
              icon={Users} 
              title="Comunidad" 
              description="Un grupo diverso de profesionales unidos por la amistad."
              delay={0.2}
            />
             <FeatureCard 
              icon={Heart} 
              title="Servicio" 
              description="Compromiso inquebrantable con las causas más nobles."
              delay={0.3}
            />
             <FeatureCard 
              icon={Award} 
              title="Liderazgo" 
              description="Fomentando la integridad y la ética profesional."
              delay={0.4}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;