import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity configuration. Please check your environment variables:\n' +
    '- NEXT_PUBLIC_SANITY_PROJECT_ID\n' +
    '- NEXT_PUBLIC_SANITY_DATASET'
  )
}

/**
 * Sanity client for production use (CDN-enabled for fast reads)
 * Use this for fetching published content in production
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

/**
 * Sanity client for draft/preview mode (no CDN, authenticated)
 * Use this when fetching draft content or unpublished documents
 */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: 'previewDrafts',
})

/**
 * Get the appropriate client based on preview mode
 * @param preview - Whether to use preview mode (fetch draft content)
 * @returns The appropriate Sanity client
 */
export function getClient(preview?: boolean) {
  if (preview) {
    if (!token) {
      console.warn(
        'Preview mode requested but SANITY_API_TOKEN is not set. Falling back to published content.'
      )
      return client
    }
    return previewClient
  }
  return client
}
