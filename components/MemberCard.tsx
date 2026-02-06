import React, { useState } from 'react';
import { Member } from '../types';
import { Mail, Phone, Cake, Briefcase, ChevronDown, ChevronUp, ExternalLink, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full duration-300 transition-colors group transform-gpu"
      style={{ backfaceVisibility: 'hidden' }}
    >
      {/* Header Image & Basic Info */}
      <div className="relative h-32 bg-gradient-to-r from-blue-600 to-sky-500">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute -bottom-12 left-6">
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-24 h-24 rounded-full border-[4px] border-white object-cover shadow-lg bg-white"
            style={{
              transform: `scale(${member.imageSettings?.zoom || 1})`,
              objectPosition: `${member.imageSettings?.x ?? 50}% ${member.imageSettings?.y ?? 50}%`
            }}
          />
        </div>
        <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 text-white shadow-sm border border-white/40">
          <Cake size={14} /> {member.birthday}
        </div>
      </div>

      <div className="pt-14 px-6 pb-6 flex-grow flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">{member.name}</h3>
          <p className="text-yellow-600 text-xs font-bold uppercase tracking-widest mt-1">{member.role}</p>
          <div className="flex items-center gap-2 mt-3 text-slate-600 text-sm">
            <Briefcase size={16} className="text-blue-500" />
            <span className="font-medium">{member.profession}</span>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-5 leading-relaxed line-clamp-3">
          {member.shortDescription}
        </p>

        {/* Quick Socials */}
        <div className="flex gap-3 mb-5 items-center">
          {member.socials?.linkedin && (
            <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-700 transition-colors p-1 hover:bg-blue-50 rounded-full"><Linkedin size={20} /></a>
          )}
          {member.socials?.twitter && (
            <a href={member.socials.twitter} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-sky-500 transition-colors p-1 hover:bg-sky-50 rounded-full"><Twitter size={20} /></a>
          )}
          {member.socials?.facebook && (
            <a href={member.socials.facebook} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-800 transition-colors p-1 hover:bg-blue-50 rounded-full"><Facebook size={20} /></a>
          )}
          {member.socials?.instagram && (
            <a href={member.socials.instagram} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-pink-600 transition-colors p-1 hover:bg-pink-50 rounded-full"><Instagram size={20} /></a>
          )}
        </div>

        <div className="mt-auto pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-sm font-semibold text-blue-600 bg-blue-50/50 hover:bg-blue-100/50 px-4 py-3 rounded-xl transition-colors group"
          >
            <span>Cómo puedo ayudarte</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-slate-50/50 overflow-hidden border-t border-slate-100"
          >
            <div className="px-6 pb-6 pt-4 space-y-5">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Servicios Profesionales</h4>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 rounded-full"></div>
                  <p className="text-sm text-slate-700 italic pl-3 leading-relaxed">
                    "{member.businessHelp}"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-700 py-2.5 rounded-xl text-sm transition-all font-medium shadow-sm"
                >
                  <Mail size={16} /> Email
                </a>
                <a
                  href={`https://wa.me/${member.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 rounded-xl text-sm transition-all font-medium shadow-sm shadow-green-200"
                >
                  <Phone size={16} /> WhatsApp
                </a>
                {member.businessUrl && (
                  <a
                    href={member.businessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm transition-all font-medium shadow-lg shadow-blue-200"
                  >
                    <ExternalLink size={16} /> Visitar Sitio Web
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MemberCard;