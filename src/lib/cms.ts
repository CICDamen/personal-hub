/**
 * CMS Data Fetching Layer
 *
 * This module provides functions to fetch content from Sanity CMS.
 * All functions maintain the same API as the previous mock implementation
 * to ensure backward compatibility with existing page components.
 */

import type { Homepage, Project, BlogPost } from '@/types/cms'
import type { SanityHomepage, SanityPost, SanityProject } from '@/types/cms'
import { getClient } from './sanity/client'
import {
  homepageQuery,
  allPostsQuery,
  postBySlugQuery,
  allPostSlugsQuery,
  recentPostsQuery,
  allProjectsQuery,
  projectBySlugQuery,
  allProjectSlugsQuery,
  featuredProjectsQuery,
} from './sanity/queries'
import { mapHomepage, mapPost, mapProject, mapPosts, mapProjects } from './sanity/mappers'

/**
 * Fetch homepage content from Sanity
 * @param preview - Enable draft/preview mode
 * @returns Homepage content
 * @throws Error if homepage document is not found or invalid
 */
export async function getHomepageContent(preview = false): Promise<Homepage> {
  try {
    const client = getClient(preview)
    const data = await client.fetch<SanityHomepage>(homepageQuery)

    if (!data) {
      throw new Error('Homepage document not found in Sanity')
    }

    return mapHomepage(data)
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    throw new Error('Failed to fetch homepage content')
  }
}

/**
 * Fetch all blog posts from Sanity
 * @param preview - Enable draft/preview mode
 * @returns Array of blog posts sorted by date (newest first)
 */
export async function getAllBlogPosts(preview = false): Promise<BlogPost[]> {
  try {
    const client = getClient(preview)
    const data = await client.fetch<SanityPost[]>(allPostsQuery)

    return mapPosts(data || [])
  } catch (error) {
    console.error('Error fetching all blog posts:', error)
    return []
  }
}

/**
 * Fetch recent blog posts with a limit
 * @param limit - Maximum number of posts to return
 * @param preview - Enable draft/preview mode
 * @returns Array of recent blog posts
 */
export async function getRecentBlogPosts(
  limit: number = 3,
  preview = false
): Promise<BlogPost[]> {
  try {
    const client = getClient(preview)
    const data = await client.fetch<SanityPost[]>(recentPostsQuery, { limit })

    return mapPosts(data || [])
  } catch (error) {
    console.error('Error fetching recent blog posts:', error)
    return []
  }
}

/**
 * Fetch a single blog post by slug
 * @param slug - URL slug of the blog post
 * @param preview - Enable draft/preview mode
 * @returns Blog post if found, null otherwise
 */
export async function getBlogPostBySlug(
  slug: string,
  preview = false
): Promise<BlogPost | null> {
  try {
    const client = getClient(preview)
    const data = await client.fetch<SanityPost | null>(postBySlugQuery, { slug })

    if (!data) {
      return null
    }

    return mapPost(data)
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch all blog post slugs for static path generation
 * @returns Array of slug strings
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const client = getClient()
    const data = await client.fetch<Array<{ slug: string }>>(allPostSlugsQuery)

    return (data || []).map((item) => item.slug).filter(Boolean)
  } catch (error) {
    console.error('Error fetching blog post slugs:', error)
    return []
  }
}

/**
 * Fetch all projects from Sanity
 * @param preview - Enable draft/preview mode
 * @returns Array of projects sorted by featured status and completion date
 */
export async function getAllProjects(preview = false): Promise<Project[]> {
  try {
    const client = getClient(preview)
    const data = await client.fetch<SanityProject[]>(allProjectsQuery)

    return mapProjects(data || [])
  } catch (error) {
    console.error('Error fetching all projects:', error)
    return []
  }
}

/**
 * Fetch featured projects with a limit
 * @param limit - Maximum number of projects to return
 * @param preview - Enable draft/preview mode
 * @returns Array of featured projects
 */
export async function getFeaturedProjects(
  limit: number = 3,
  preview = false
): Promise<Project[]> {
  try {
    const client = getClient(preview)
    const data = await client.fetch<SanityProject[]>(featuredProjectsQuery, { limit })

    return mapProjects(data || [])
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

/**
 * Fetch a single project by slug
 * @param slug - URL slug of the project
 * @param preview - Enable draft/preview mode
 * @returns Project if found, null otherwise
 */
export async function getProjectBySlug(
  slug: string,
  preview = false
): Promise<Project | null> {
  try {
    const client = getClient(preview)
    const data = await client.fetch<SanityProject | null>(projectBySlugQuery, { slug })

    if (!data) {
      return null
    }

    return mapProject(data)
  } catch (error) {
    console.error(`Error fetching project with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch all project slugs for static path generation
 * @returns Array of slug strings
 */
export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const client = getClient()
    const data = await client.fetch<Array<{ slug: string }>>(allProjectSlugsQuery)

    return (data || []).map((item) => item.slug).filter(Boolean)
  } catch (error) {
    console.error('Error fetching project slugs:', error)
    return []
  }
}
