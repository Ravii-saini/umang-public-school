import type { PortableTextBlock } from "@portabletext/types";

export type Notice = {
  _id: string;
  title: string;
  content: PortableTextBlock[];
  category?: string;
  priority?: "Normal" | "Urgent";
  pin?: boolean;
  pdfUrl?: string;
  author?: string;
  publishedAt?: string;
};

export type Event = {
  _id: string;
  title: string;
  description?: PortableTextBlock[];
  date: string;
  category?: string;
  location?: string;
};

export type GalleryItem = {
  _id: string;
  title: string;
  imageUrl: string;
  category?: string;
};

export type AboutPage = {
  _id: string;
  heading: string;
  body: PortableTextBlock[];
  heroImage?: string;
};

export type SiteSettings = {
  _id: string;
  schoolName: string;
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  heroDescription?: string;
};

export type Announcement = {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
  link?: string;
  priority?: number;
  active?: boolean;
};

export type Faculty = {
  _id: string;
  name: string;
  designation: string;
  photoUrl: string;
  mobileNumber?: string;
  email?: string;
  subject?: string;
  order?: number;
  featured?: boolean;
};

export type Download = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  fileUrl: string;
  fileSize?: string;
  publishedAt: string;
  featured?: boolean;
};
