/**
 * Mapper functions to transform Sanity responses to application types
 * These functions convert raw Sanity documents into the interfaces expected by components
 */

import type {
  SanityHomepage,
  SanityPost,
  SanityProject,
  Homepage,
  BlogPost,
  Project,
  SanityImage,
  ProcessedImage,
} from '@/types/cms'
import { urlFor, getImageAlt } from './image'

/**
 * Convert a Sanity image to a processed image with URL
 * @param image - Sanity image object
 * @param fallbackAlt - Fallback alt text if not provided
 * @returns Processed image with URL and alt text
 */
export function mapSanityImage(
  image: SanityImage | undefined | null,
  fallbackAlt: string = 'Image'
): ProcessedImage | undefined {
  if (!image || !image.asset) {
    return undefined
  }

  return {
    url: urlFor(image).url(),
    alt: getImageAlt(image, fallbackAlt),
  }
}

/**
 * Map Sanity homepage document to Homepage interface
 * @param doc - Raw Sanity homepage document
 * @returns Homepage object for application use
 */
export function mapHomepage(doc: SanityHomepage): Homepage {
  const headshot = mapSanityImage(doc.headshot, 'Professional headshot')

  if (!headshot) {
    throw new Error('Homepage headshot is required')
  }

  return {
    name: doc.name,
    title: doc.title,
    tagline: doc.tagline,
    headshot,
    bio: doc.bio,
    socialLinks: doc.socialLinks || {},
    contact: doc.contact || {},
  }
}

/**
 * Map Sanity post document to BlogPost interface
 * @param doc - Raw Sanity post document
 * @returns BlogPost object for application use
 */
export function mapPost(doc: SanityPost): BlogPost {
  return {
    id: doc._id,
    title: doc.title,
    excerpt: doc.excerpt,
    slug: doc.slug.current,
    publishedDate: doc.publishedDate,
    thumbnail: mapSanityImage(doc.thumbnail, doc.title),
    author: doc.author,
    readingTime: doc.readingTime,
    content: doc.content,
  }
}

/**
 * Map Sanity project document to Project interface
 * @param doc - Raw Sanity project document
 * @returns Project object for application use
 */
export function mapProject(doc: SanityProject): Project {
  return {
    id: doc._id,
    title: doc.title,
    description: doc.description,
    slug: doc.slug.current,
    thumbnail: mapSanityImage(doc.thumbnail, doc.title),
    featured: doc.featured,
    technologies: doc.technologies || [],
    link: doc.link,
    content: doc.content,
    challenge: doc.challenge,
    solution: doc.solution,
    outcomes: doc.outcomes,
    images: doc.images
      ?.map((img) => mapSanityImage(img, doc.title))
      .filter((img): img is ProcessedImage => img !== undefined),
    completionDate: doc.completionDate,
    clientName: doc.clientName,
  }
}

/**
 * Map array of Sanity posts to BlogPost array
 * @param docs - Array of raw Sanity post documents
 * @returns Array of BlogPost objects
 */
export function mapPosts(docs: SanityPost[]): BlogPost[] {
  return docs.map(mapPost)
}

/**
 * Map array of Sanity projects to Project array
 * @param docs - Array of raw Sanity project documents
 * @returns Array of Project objects
 */
export function mapProjects(docs: SanityProject[]): Project[] {
  return docs.map(mapProject)
}
