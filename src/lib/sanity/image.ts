import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import type { SanityImage } from '@/types/cms'
import { client } from './client'

/**
 * Image URL builder for Sanity images
 * Provides methods to transform and optimize images from Sanity CDN
 */
const builder = imageUrlBuilder(client)

/**
 * Generate a URL for a Sanity image with optional transformations
 * @param source - Sanity image reference
 * @returns Image URL builder instance
 * @example
 * const url = urlFor(image).width(800).height(600).url()
 */
export function urlFor(source: SanityImage | Image) {
  return builder.image(source as Image)
}

/**
 * Generate an optimized image URL for use with Next.js Image component
 * @param source - Sanity image reference
 * @param width - Desired width
 * @param quality - Image quality (1-100)
 * @returns Optimized image URL
 */
export function getImageUrl(
  source: Image,
  width?: number,
  quality: number = 75
): string {
  let urlBuilder = builder.image(source).auto('format').quality(quality)

  if (width) {
    urlBuilder = urlBuilder.width(width)
  }

  return urlBuilder.url()
}

/**
 * Generate a blur placeholder URL for progressive image loading
 * @param source - Sanity image reference
 * @returns Low-quality placeholder image URL
 */
export function getBlurPlaceholder(source: Image): string {
  return builder
    .image(source)
    .width(20)
    .height(20)
    .blur(10)
    .quality(30)
    .url()
}

/**
 * Extract alt text from a Sanity image object
 * @param image - Sanity image object with potential alt field
 * @param fallback - Fallback text if alt is not provided
 * @returns Alt text string
 */
export function getImageAlt(
  image: any,
  fallback: string = 'Image'
): string {
  return image?.alt || fallback
}

/**
 * Generate srcset string for responsive images
 * @param source - Sanity image reference
 * @param widths - Array of widths to generate
 * @returns srcset string for use in img tag
 */
export function generateSrcSet(
  source: Image,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920]
): string {
  return widths
    .map((width) => {
      const url = builder
        .image(source)
        .width(width)
        .auto('format')
        .quality(75)
        .url()
      return `${url} ${width}w`
    })
    .join(', ')
}

/**
 * Custom loader for Next.js Image component
 * Integrates Sanity CDN with Next.js Image optimization
 * @param params - Image loader parameters
 * @returns Optimized image URL
 */
export function sanityImageLoader({
  src,
  width,
  quality = 75,
}: {
  src: string
  width: number
  quality?: number
}): string {
  // If src is already a full URL (for already-transformed images), return as-is
  if (src.startsWith('http')) {
    return src
  }

  // Otherwise, treat as an image reference and build URL
  return getImageUrl(src as any, width, quality)
}

/**
 * Extract image dimensions from Sanity image metadata
 * @param image - Sanity image object
 * @returns Object with width and height, or undefined
 */
export function getImageDimensions(image: any):
  | { width: number; height: number; aspectRatio: number }
  | undefined {
  if (!image?.asset?._ref) {
    return undefined
  }

  // Extract dimensions from image asset reference
  // Format: image-<id>-<width>x<height>-<format>
  const ref = image.asset._ref
  const dimensions = ref.split('-')[2]

  if (!dimensions) {
    return undefined
  }

  const [width, height] = dimensions.split('x').map(Number)

  if (!width || !height) {
    return undefined
  }

  return {
    width,
    height,
    aspectRatio: width / height,
  }
}
