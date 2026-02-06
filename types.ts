export interface Member {
  id: string;
  name: string;
  role: string; // e.g., President, Member, Treasurer
  profession: string;
  shortDescription: string;
  businessHelp: string;
  imageUrl: string;
  email: string;
  whatsapp: string;
  birthday: string; // DD/MM
  businessUrl?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  imageSettings?: {
    zoom?: number;
    x?: number;
    y?: number;
  };
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  isInstagram: boolean;
  link?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
}