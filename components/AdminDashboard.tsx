import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, Plus, Trash2, Edit2, Check, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react';
import { Member, Event, GalleryItem } from '../types';
import { CLUB_MEMBERS, UPCOMING_EVENTS, GALLERY_ITEMS } from '../constants';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'members' | 'events' | 'gallery'>('members');
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Data States
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  // Form States (Generic simplified)
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Image Adjustment States
  const [imgZoom, setImgZoom] = useState(1);
  const [imgX, setImgX] = useState(50);
  const [imgY, setImgY] = useState(50);

  useEffect(() => {
    if (editingItem?.imageSettings) {
      setImgZoom(editingItem.imageSettings.zoom || 1);
      setImgX(editingItem.imageSettings.x ?? 50);
      setImgY(editingItem.imageSettings.y ?? 50);
    } else {
      setImgZoom(1);
      setImgX(50);
      setImgY(50);
    }
  }, [editingItem]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'rotary2024') {
      setIsAuthenticated(true);
      loadData();
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [mRes, eRes, gRes] = await Promise.all([
        fetch('/api/get-members'),
        fetch('/api/get-events'),
        fetch('/api/get-gallery')
      ]);
      setMembers(await mRes.json());
      setEvents(await eRes.json());
      setGallery(await gRes.json());
    } catch (e) {
      console.error("API Error, falling back to local constants:", e);
      setMembers(CLUB_MEMBERS);
      setEvents(UPCOMING_EVENTS);
      setGallery(GALLERY_ITEMS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) loadData();
  }, [refreshTrigger, isAuthenticated]);

  const handleDelete = async (id: string, type: 'member' | 'event' | 'gallery') => {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return;

    let endpoint = '';
    if (type === 'member') endpoint = '/api/manage-members';
    if (type === 'event') endpoint = '/api/manage-events';
    if (type === 'gallery') endpoint = '/api/manage-gallery';

    await fetch(endpoint, {
      method: 'DELETE',
      body: JSON.stringify({ id })
    });
    setRefreshTrigger(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let endpoint = '';
    let method = editingItem?.id ? 'PUT' : 'POST';

    // Construct Payload
    const formData = new FormData(e.target as HTMLFormElement);
    const payload: any = Object.fromEntries(formData.entries());

    if (activeTab === 'members') {
      endpoint = '/api/manage-members';
      // Structure nested objects manually if needed, or simple flat map
      payload.socials = {
        linkedin: payload.linkedin,
        facebook: payload.facebook,
        instagram: payload.instagram,
        twitter: payload.twitter
      };
      payload.imageSettings = {
        zoom: imgZoom,
        x: imgX,
        y: imgY
      };
      if (editingItem?.id) payload.id = editingItem.id;
    } else if (activeTab === 'events') {
      endpoint = '/api/manage-events';
      if (editingItem?.id) payload.id = editingItem.id;
    } else {
      endpoint = '/api/manage-gallery';
      payload.isInstagram = payload.isInstagram === 'on';
      method = 'POST'; // Gallery currently only supports add/delete in this simple version
    }

    try {
      const res = await fetch(endpoint, {
        method,
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsFormOpen(false);
        setEditingItem(null);
        setRefreshTrigger(prev => prev + 1);
      } else {
        alert('Error al guardar');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><Lock size={20} /> Admin Panel</h2>
            <button onClick={onClose}><X size={20} /></button>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
              Entrar
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center z-10">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Lock size={18} className="text-blue-600" />
          Administración
        </h2>
        <div className="flex items-center gap-4">
          <button onClick={() => setRefreshTrigger(p => p + 1)} className="p-2 hover:bg-slate-100 rounded-full"><RefreshCw size={20} className={loading ? "animate-spin" : ""} /></button>
          <button onClick={onClose} className="p-2 hover:bg-red-50 text-red-500 rounded-full"><X size={24} /></button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-slate-200 p-4 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('members')}
            className={`text-left px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'members' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Socios
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`text-left px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'events' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Eventos
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`text-left px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'gallery' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Galería
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold capitalize text-slate-800">{activeTab === 'gallery' ? 'Galería' : activeTab === 'events' ? 'Eventos' : 'Socios'}</h3>
            <button
              onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm transition-colors"
            >
              <Plus size={18} /> Agregar Nuevo
            </button>
          </div>

          {/* List */}
          <div className="grid gap-4">
            {activeTab === 'members' && members.map(m => (
              <div key={m.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={m.imageUrl} className="w-10 h-10 rounded-full object-cover bg-slate-200" alt="" />
                  <div>
                    <h4 className="font-bold text-slate-800">{m.name}</h4>
                    <p className="text-xs text-slate-500">{m.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingItem(m); setIsFormOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(m.id, 'member')} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'events' && events.map(ev => (
              <div key={ev.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={ev.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{ev.title}</h4>
                    <p className="text-xs text-slate-500">{ev.date} - {ev.location}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingItem(ev); setIsFormOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(ev.id, 'event')} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'gallery' && gallery.map(g => (
              <div key={g.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={g.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 line-clamp-1">{g.caption}</h4>
                    <p className="text-xs text-slate-500">{g.isInstagram ? 'Instagram Link' : 'Local'}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(g.id, 'gallery')} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold">
                {editingItem ? 'Editar' : 'Agregar'} {activeTab === 'members' ? 'Socio' : activeTab === 'events' ? 'Evento' : 'Imagen'}
              </h3>
              <button onClick={() => setIsFormOpen(false)}><X /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">

              {/* MEMBER FORM */}
              {activeTab === 'members' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="name" defaultValue={editingItem?.name} required placeholder="Nombre Completo" className="input-field" />
                    <input name="role" defaultValue={editingItem?.role} required placeholder="Rol (Ej: Presidente)" className="input-field" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="profession" defaultValue={editingItem?.profession} required placeholder="Profesión" className="input-field" />
                    <input name="birthday" defaultValue={editingItem?.birthday} required placeholder="Cumpleaños (DD/MM)" className="input-field" />
                  </div>
                  <input name="imageUrl" defaultValue={editingItem?.imageUrl} required placeholder="URL Foto de Perfil" className="input-field" />

                  {/* Image Adjuster */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="font-bold text-sm text-slate-500 mb-3">Ajustar Foto de Perfil</p>
                    <div className="flex gap-6">
                      {/* Preview */}
                      <div className="shrink-0">
                        <div className="w-24 h-24 rounded-full border-[4px] border-white shadow-lg overflow-hidden relative bg-slate-200">
                          {editingItem?.imageUrl && (
                            <img
                              src={editingItem.imageUrl}
                              className="w-full h-full object-cover"
                              style={{
                                transform: `scale(${imgZoom})`,
                                objectPosition: `${imgX}% ${imgY}%`
                              }}
                            />
                          )}
                        </div>
                      </div>
                      {/* Controls */}
                      <div className="flex-grow space-y-3">
                        <div>
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>Zoom ({imgZoom}x)</span>
                          </div>
                          <input type="range" min="1" max="3" step="0.1" value={imgZoom} onChange={e => setImgZoom(parseFloat(e.target.value))} className="w-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-xs text-slate-500 block mb-1">Posición X ({imgX}%)</span>
                            <input type="range" min="0" max="100" value={imgX} onChange={e => setImgX(parseFloat(e.target.value))} className="w-full" />
                          </div>
                          <div>
                            <span className="text-xs text-slate-500 block mb-1">Posición Y ({imgY}%)</span>
                            <input type="range" min="0" max="100" value={imgY} onChange={e => setImgY(parseFloat(e.target.value))} className="w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <textarea name="shortDescription" defaultValue={editingItem?.shortDescription} required placeholder="Descripción Corta" className="input-field" rows={2} />
                  <textarea name="businessHelp" defaultValue={editingItem?.businessHelp} required placeholder="Ayuda Profesional (Servicios)" className="input-field" rows={2} />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="email" defaultValue={editingItem?.email} required type="email" placeholder="Email" className="input-field" />
                    <input name="whatsapp" defaultValue={editingItem?.whatsapp} required placeholder="WhatsApp (Num sin +)" className="input-field" />
                  </div>
                  <input name="businessUrl" defaultValue={editingItem?.businessUrl} placeholder="URL Sitio Web (Opcional)" className="input-field" />
                  <p className="font-bold text-sm text-slate-500 mt-2">Redes Sociales (URLs)</p>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="linkedin" defaultValue={editingItem?.socials?.linkedin} placeholder="LinkedIn" className="input-field" />
                    <input name="facebook" defaultValue={editingItem?.socials?.facebook} placeholder="Facebook" className="input-field" />
                    <input name="instagram" defaultValue={editingItem?.socials?.instagram} placeholder="Instagram" className="input-field" />
                    <input name="twitter" defaultValue={editingItem?.socials?.twitter} placeholder="Twitter/X" className="input-field" />
                  </div>
                </>
              )}

              {/* EVENT FORM */}
              {activeTab === 'events' && (
                <>
                  <input name="title" defaultValue={editingItem?.title} required placeholder="Título del Evento" className="input-field" />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="date" defaultValue={editingItem?.date} required placeholder="Fecha (DD MMM YYYY)" className="input-field" />
                    <input name="time" defaultValue={editingItem?.time} required placeholder="Hora" className="input-field" />
                  </div>
                  <input name="location" defaultValue={editingItem?.location} required placeholder="Ubicación" className="input-field" />
                  <input name="imageUrl" defaultValue={editingItem?.imageUrl} required placeholder="URL Imagen Evento" className="input-field" />
                  <textarea name="description" defaultValue={editingItem?.description} required placeholder="Descripción" className="input-field" rows={3} />
                </>
              )}

              {/* GALLERY FORM */}
              {activeTab === 'gallery' && (
                <>
                  <input name="imageUrl" required placeholder="URL de la Imagen" className="input-field" />
                  <input name="caption" required placeholder="Pie de foto / Descripción" className="input-field" />
                  <div className="flex items-center gap-2">
                    <input type="checkbox" name="isInstagram" id="isIg" className="w-4 h-4" />
                    <label htmlFor="isIg">Es enlace de Instagram?</label>
                  </div>
                  <input name="link" placeholder="Link (si es Instagram)" className="input-field" />
                </>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">Cancelar</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          outline: none;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;