import React from 'react';
import { Facebook, Twitter, Instagram, Mail, MapPin, Lock } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="relative bg-slate-900 pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-full p-1 shadow-md">
                <img src="/rtr.png" alt="Rotary Logo" className="w-8 h-8 object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Club Rotario <span className="text-yellow-500">Puebla Vivo</span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Juntos, vemos un mundo donde las personas se unen y toman acción para crear un cambio duradero en nosotros mismos, en nuestras comunidades y en el mundo entero.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#home" className="hover:text-yellow-400 transition-colors">Inicio</a></li>
              <li><a href="#about" className="hover:text-yellow-400 transition-colors">Nosotros</a></li>
              <li><a href="#directory" className="hover:text-yellow-400 transition-colors">Directorio de Socios</a></li>
              <li><a href="#gallery" className="hover:text-yellow-400 transition-colors">Galería</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contacto</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 mt-0.5" />
                <span>Centro de Convenciones Puebla, <br />Blvd. Héroes del 5 de Mayo 402</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500" />
                <a href="mailto:info@rotarypueblavivo.org" className="hover:text-white">info@rotarypueblavivo.org</a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-400 transition-colors"><Twitter size={20} /></a>
              <a href="https://www.instagram.com/clubrotariopueblavivo/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-pink-600 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex justify-between items-center text-slate-500 text-xs">
          <p>
            © {new Date().getFullYear()} Club Rotario Puebla Vivo. Todos los derechos reservados.
          </p>
          <button onClick={onAdminClick} className="opacity-20 hover:opacity-100 transition-opacity">
            <Lock size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;