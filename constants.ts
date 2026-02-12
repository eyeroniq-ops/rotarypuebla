import { Member, GalleryItem, Event } from './types';

export const ROTARY_BLUE = "#005DAA";
export const ROTARY_GOLD = "#F7A81B";

export const CLUB_MEMBERS: Member[] = [
  {
    id: "10",
    name: "Jorge Angulo",
    role: "Presidente",
    profession: "Psicólogo",
    shortDescription: "Líder comprometido con el servicio y la comunidad.",
    businessHelp: "Soluciones en adicciones.",
    imageUrl: "/foto_jorge_angulo.jpg",
    email: "jorge.angulo@example.com",
    whatsapp: "522225544790",
    birthday: "01/01",
    socials: {}
  },
  {
    id: "11",
    name: "Dr. Rubén Romero Méndez",
    role: "Socio Activo",
    profession: "Médico Ortopedista / Cirujano de Columna",
    shortDescription: "Jefe de Cirugía de Columna en el IMSS y Tesorero del Colegio de Ortopedia de Puebla.",
    businessHelp: "Especialista en cirugía de columna y ortopedia traumatológica de alta especialidad.",
    imageUrl: "/foto_ruben_romero.jpg",
    email: "ruben.romero@example.com",
    whatsapp: "522223067568",
    birthday: "01/01",
    businessUrl: "https://www.instagram.com/dr.romero.mendez",
    socials: {
      instagram: "https://www.instagram.com/dr.romero.mendez"
    }
  },
  {
    id: "1",
    name: "Sixto Martínez Garrido",
    role: "Socio Activo",
    profession: "Contador Público",
    shortDescription: "Experto en contabilidad y finanzas.",
    businessHelp: "Asesoría fiscal, contable y financiera.",
    imageUrl: "/foto_sixto_martinez.jpg",
    email: "sixto.martinez@example.com",
    whatsapp: "522224394451",
    birthday: "01/01",
    socials: {}
  },
  {
    id: "2",
    name: "Mayela Romero Pérez",
    role: "Socio Activo",
    profession: "Logística de transporte / Permisos SCT / Consultoría empresarial",
    shortDescription: "Especialista en logística, permisos SCT y consultoría empresarial.",
    businessHelp: "Asesoría en logística de transporte y trámites ante SCT.",
    imageUrl: "/foto_mayela_romero.jpg",
    email: "mayela@strateggia.com",
    whatsapp: "522221143039",
    birthday: "18/01",
    businessUrl: "https://strateggia.com",
    socials: {}
  },

  {
    id: "7",
    name: "Karla Mariana Silva Revilla",
    role: "Socio Activo",
    profession: "Co-Founder UNLOCK Universe / Estratega Web3",
    shortDescription: "Líder en innovación, comunidades digitales y tecnologías emergentes.",
    businessHelp: "Estrategias de marca, crecimiento digital e implementación Web3.",
    imageUrl: "/foto_karla_revilla.jpg",
    email: "karlarevilla04@gmail.com",
    whatsapp: "522221817738",
    birthday: "04/04",
    socials: {}
  },
  {
    id: "5",
    name: "Alejandro Luna Anivarro",
    role: "Socio Activo",
    profession: "Consultoría empresarial y de proyectos",
    shortDescription: "Consultor experto en gestión y desarrollo de proyectos.",
    businessHelp: "Asesoría estratégica para proyectos empresariales.",
    imageUrl: "/foto_alejandro_luna.jpg",
    email: "alex.luna.an@gmail.com",
    whatsapp: "522223818251",
    birthday: "07/01",
    socials: {}
  },
  {
    id: "6",
    name: "Rosa María Romero Sánchez",
    role: "Socio Activo",
    profession: "Emprendedora Textil / Diseño de Alta Costura",
    shortDescription: "Especialista en vestidos de XV años, novias, 3 años y primera comunión.",
    businessHelp: "Diseño y confección de alta costura para ceremonias y eventos especiales.",
    imageUrl: "/foto_rosa_maria_romero.jpg",
    email: "rosa.romero@example.com",
    whatsapp: "522223884671",
    birthday: "01/01",
    socials: {
      instagram: "https://instagram.com/roko.ko2",
      facebook: "https://facebook.com/Rosa Sanchez"
    }
  },
  {
    id: "8",
    name: "Fer López Olea",
    role: "Socio Activo",
    profession: "Gestor Educativo / Estratega Cultural / Creativo",
    shortDescription: "Impulsor de innovación en INNCREA y Director de Vinculación en Terapias Ecuestres México OPPAC.",
    businessHelp: "Desarrollo de proyectos de comunicación, liderazgo y transformation social. Experto en difusión cultural y podcasting.",
    imageUrl: "/foto_fer_olea.jpg",
    email: "fer.lopez@example.com",
    whatsapp: "522220000000",
    birthday: "01/01",
    socials: {}
  },
  {
    id: "9",
    name: "Hugo Roa",
    role: "Socio Activo",
    profession: "Miembro del Club Rotario",
    shortDescription: "Comprometido con el servicio y las causas rotarias.",
    businessHelp: "Colaboración en proyectos de impacto social.",
    imageUrl: "/foto_hugo_roa.jpg",
    email: "hugo.roa@example.com",
    whatsapp: "522220000000",
    birthday: "01/01",
    socials: {}
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    imageUrl: "/gallery-1.png",
    caption: "Evento Rotario",
    isInstagram: false
  },
  {
    id: "g2",
    imageUrl: "/gallery-2.png",
    caption: "Actividades del Club",
    isInstagram: false
  },
  {
    id: "g4",
    imageUrl: "/gallery_tesla_final_1.jpg",
    caption: "Gracias: Unidos por el futuro - Tesla Puebla",
    isInstagram: false
  },
  {
    id: "g5",
    imageUrl: "/gallery_tesla_final_2.jpg",
    caption: "Optimus: El futuro de la robótica asistida",
    isInstagram: false
  },
  {
    id: "g6",
    imageUrl: "/gallery_tesla_final_3.jpg",
    caption: "Visión Compartida: Alianzas estratégicas",
    isInstagram: false
  },
  {
    id: "g7",
    imageUrl: "/gallery_tesla_final_4.jpg",
    caption: "Tesla AI: Innovación que transforma comunidades",
    isInstagram: false
  },
  {
    id: "g8",
    imageUrl: "/gallery_tesla_final_5.jpg",
    caption: "Optimus: El futuro de la robótica",
    isInstagram: false
  },
  {
    id: "g9",
    imageUrl: "/gallery_africam_1.png",
    caption: "Aventura con Propósito: Niños de Rotary en Africam Safari",
    isInstagram: false
  },
  {
    id: "g10",
    imageUrl: "/gallery_africam_2.png",
    caption: "Conectando Generaciones: El espíritu rotario",
    isInstagram: false
  },
  {
    id: "g11",
    imageUrl: "/gallery_ancianos_final.png",
    caption: "Conexiones de Corazón: Compartiendo con nuestros adultos mayores",
    isInstagram: false
  },
  {
    id: "g12",
    imageUrl: "/gallery_ser_rotario_final.png",
    caption: "¿Qué es ser Rotario? Transformando voluntad en acción",
    isInstagram: false
  },
  {
    id: "g13",
    imageUrl: "/gallery_terapias_final_v2.png",
    caption: "Corazón y Movimiento: Terapias que transforman vidas",
    isInstagram: false
  },
  {
    id: "g14",
    imageUrl: "/gallery_abotonamiento_final.png",
    caption: "Nuevos Líderes, Mismo Compromiso: Abotonamiento de socios",
    isInstagram: false
  }
];

export const UPCOMING_EVENTS: Event[] = [
  {
    id: "e2",
    title: "Sesión Ordinaria y Cena",
    date: "Jueves 5 Febrero",
    time: "20:00 hrs",
    location: "Hotel Sede",
    description: "Mes del Amor y la Amistad. Incluye abotonamiento de nuevo socio, planeación de Super Bowl y tamales, y misión: Teslas para los Niños.",
    imageUrl: "/sesion-ordinaria-febrero.jpg"
  }
];
