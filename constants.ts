import { Member, GalleryItem, Event } from './types';

export const ROTARY_BLUE = "#005DAA";
export const ROTARY_GOLD = "#F7A81B";

export const CLUB_MEMBERS: Member[] = [
  {
    id: "1",
    name: "Dr. Alejandro Vargas",
    role: "Presidente Actual",
    profession: "Cardiólogo Intervencionista",
    shortDescription: "Apasionado por la salud cardiovascular y el servicio comunitario desde hace 15 años.",
    businessHelp: "Consultoría médica especializada, chequeos preventivos y conferencias de salud.",
    imageUrl: "https://picsum.photos/id/1012/400/400",
    email: "alejandro.v@example.com",
    whatsapp: "522221234567",
    birthday: "14/03",
    businessUrl: "https://hospital-example.com",
    socials: {
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com"
    }
  },
  {
    id: "2",
    name: "Arq. Sofia Mendoza",
    role: "Directora de Proyectos",
    profession: "Arquitecta Sustentable",
    shortDescription: "Diseñando espacios que conviven con la naturaleza y mejoran la calidad de vida urbana.",
    businessHelp: "Diseño arquitectónico, remodelaciones eco-amigables y gestión de permisos de obra.",
    imageUrl: "https://picsum.photos/id/1027/400/400",
    email: "sofia.arch@example.com",
    whatsapp: "522229876543",
    birthday: "22/08",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "3",
    name: "Lic. Roberto Gil",
    role: "Socio Activo",
    profession: "Abogado Corporativo",
    shortDescription: "Experto en derecho mercantil y protección de patrimonio familiar.",
    businessHelp: "Asesoría legal para empresas, contratos, y constitución de sociedades.",
    imageUrl: "https://picsum.photos/id/1005/400/400",
    email: "roberto.gil@example.com",
    whatsapp: "522225558888",
    birthday: "05/11",
    socials: {
      twitter: "https://twitter.com",
      facebook: "https://facebook.com"
    }
  },
  {
    id: "4",
    name: "Mtra. Elena Torres",
    role: "Secretaria",
    profession: "Consultora Educativa",
    shortDescription: "Dedicada a transformar la educación a través de la tecnología y la innovación.",
    businessHelp: "Capacitación docente, diseño curricular y talleres de liderazgo.",
    imageUrl: "https://picsum.photos/id/342/400/400",
    email: "elena.edu@example.com",
    whatsapp: "522223334444",
    birthday: "30/01",
    socials: {
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "5",
    name: "Ing. Carlos Ruiz",
    role: "Tesorero",
    profession: "Ingeniero Civil",
    shortDescription: "Construyendo infraestructura sólida para el futuro de Puebla.",
    businessHelp: "Cálculo estructural, supervisión de obra y dictámenes de seguridad.",
    imageUrl: "https://picsum.photos/id/1074/400/400",
    email: "carlos.ing@example.com",
    whatsapp: "522221112222",
    birthday: "12/06",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    }
  },
  {
    id: "6",
    name: "Dra. Mariana López",
    role: "Socio Activo",
    profession: "Odontóloga",
    shortDescription: "Creando sonrisas saludables y fomentando la higiene bucal en comunidades rurales.",
    businessHelp: "Tratamientos dentales integrales, ortodoncia y estética dental.",
    imageUrl: "https://picsum.photos/id/64/400/400",
    email: "mariana.dent@example.com",
    whatsapp: "522227779999",
    birthday: "19/09",
    socials: {
      instagram: "https://instagram.com"
    }
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    imageUrl: "https://picsum.photos/id/1015/600/600",
    caption: "Entrega de sillas de ruedas - Campaña 2024",
    isInstagram: false
  },
  {
    id: "g2",
    imageUrl: "https://picsum.photos/id/1016/600/600",
    caption: "Cena de Gala Anual",
    isInstagram: true,
    link: "https://instagram.com"
  },
  {
    id: "g3",
    imageUrl: "https://picsum.photos/id/1018/600/600",
    caption: "Reforestación en La Malinche",
    isInstagram: false
  },
  {
    id: "g4",
    imageUrl: "https://picsum.photos/id/1025/600/600",
    caption: "Visita del Gobernador de Distrito",
    isInstagram: true,
    link: "https://instagram.com"
  },
];

export const UPCOMING_EVENTS: Event[] = [
  {
    id: "e1",
    title: "Cena de Recaudación Anual",
    date: "15 Oct 2024",
    time: "20:00 hrs",
    location: "Hotel Quinta Real Puebla",
    description: "Únete a nosotros para una noche elegante recaudando fondos para el programa de agua limpia.",
    imageUrl: "https://picsum.photos/id/431/600/400"
  },
  {
    id: "e2",
    title: "Jornada de Salud Visual",
    date: "02 Nov 2024",
    time: "09:00 hrs",
    location: "Zócalo de San Pedro Cholula",
    description: "Exámenes de la vista y entrega de lentes gratuitos a comunidades vulnerables.",
    imageUrl: "https://picsum.photos/id/338/600/400"
  },
  {
    id: "e3",
    title: "Torneo de Golf Rotario",
    date: "18 Nov 2024",
    time: "07:30 hrs",
    location: "Club Campestre Puebla",
    description: "Torneo benéfico a favor de la erradicación de la Polio. ¡Inscríbete y participa!",
    imageUrl: "https://picsum.photos/id/193/600/400"
  }
];