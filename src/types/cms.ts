import type { Image } from 'sanity'

/**
 * A single client with logo
 */
export interface Client {
  name: string
  logo: ProcessedImage
  url?: string
}

/**
 * Client logos section content
 * Singleton document
 */
export interface ClientLogos {
  clients: Client[]
}

/**
 * Raw clients document from Sanity
 */
export interface SanityClients {
  _id: string
  _type: 'clients'
  clients?: Array<{
    _key: string
    name: string
    logo: SanityImage
    url?: string
  }>
}

/**
 * A single technology item (language, tool, platform, etc.)
 */
export interface TechItem {
  name: string
  /** Simple Icons slug for the icon (auto-derived from name if not set) */
  iconSlug?: string
  url?: string
}

/**
 * A group of related technologies
 */
export interface TechCategory {
  name: string
  items: TechItem[]
}

/**
 * A professional certification or credential
 */
export interface Certification {
  name: string
  issuer: string
  dateEarned?: string
  expiryDate?: string
  link?: string
  image?: ProcessedImage
  /** Simple Icons slug for the issuing organization */
  issuerIconSlug?: string
}

/**
 * Skills & Certifications page content
 * Singleton document
 */
export interface Skills {
  techCategories: TechCategory[]
  certifications: Certification[]
}

/**
 * Raw skills document from Sanity
 */
export interface SanitySkills {
  _id: string
  _type: 'skills'
  techCategories?: Array<{
    _key: string
    name: string
    items?: Array<{
      _key: string
      name: string
      iconSlug?: string
      url?: string
    }>
  }>
  certifications?: Array<{
    _key: string
    name: string
    issuer: string
    dateEarned?: string
    expiryDate?: string
    link?: string
    image?: SanityImage
    issuerIconSlug?: string
  }>
}

/**
 * Sanity image reference type
 * Raw image data from Sanity before URL transformation
 */
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

/**
 * Processed image with URL
 * Used in application components after Sanity image transformation
 */
export interface ProcessedImage {
  url: string
  alt: string
}

/**
 * Homepage content
 * Singleton document containing personal information and branding
 */
export interface Homepage {
  name: string
  title: string
  tagline: string
  headshot: ProcessedImage
  bio: string
  socialLinks: {
    github?: string
    linkedin?: string
  }
  contact: {
    email?: string
    location?: string
  }
}

/**
 * Raw homepage document from Sanity
 * Before transformation to Homepage interface
 */
export interface SanityHomepage {
  _id: string
  _type: 'homepage'
  name: string
  title: string
  tagline: string
  headshot: SanityImage
  bio: string
  socialLinks?: {
    github?: string
    linkedin?: string
  }
  contact?: {
    email?: string
    location?: string
  }
}

/**
 * Project document
 * Case study or portfolio piece
 */
export interface Project {
  id: string
  title: string
  description: string
  slug: string
  thumbnail?: ProcessedImage
  featured: boolean
  technologies?: string[]
  link?: string
  content: string
  challenge: string
  solution: string
  outcomes: string[]
  images?: ProcessedImage[]
  completionDate: string
  clientName?: string
}

/**
 * Raw project document from Sanity
 * Before transformation to Project interface
 */
export interface SanityProject {
  _id: string
  _type: 'project'
  title: string
  description: string
  slug: {
    current: string
  }
  thumbnail?: SanityImage
  featured: boolean
  technologies?: string[]
  link?: string
  content: string
  challenge: string
  solution: string
  outcomes: string[]
  images?: SanityImage[]
  completionDate: string
  clientName?: string
}

/**
 * Blog post document
 * Article or tutorial content
 */
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  slug: string
  publishedDate: string
  thumbnail?: ProcessedImage
  author: string
  readingTime?: number
  content: string
}

/**
 * Raw blog post document from Sanity
 * Before transformation to BlogPost interface
 */
export interface SanityPost {
  _id: string
  _type: 'post'
  title: string
  excerpt: string
  slug: {
    current: string
  }
  publishedDate: string
  thumbnail?: SanityImage
  author: string
  readingTime?: number
  content: string
}
