# API Documentation

This document provides comprehensive documentation for the Personal Hub CMS API and internal functions.

## Table of Contents

- [Overview](#overview)
- [CMS Functions](#cms-functions)
- [Sanity Client](#sanity-client)
- [GROQ Queries](#groq-queries)
- [Data Mappers](#data-mappers)
- [Image Utilities](#image-utilities)
- [API Routes](#api-routes)
- [Type Definitions](#type-definitions)

## Overview

The Personal Hub API is built on Sanity CMS and provides functions for fetching homepage content, blog posts, and projects. All functions are server-side only and use the Sanity client to fetch data via GROQ queries.

**Base URL**: Internal functions (no external API)
**Authentication**: Sanity API token (server-side only)
**Data Format**: TypeScript interfaces with full type safety

## CMS Functions

Located in `src/lib/cms.ts`, these functions provide a clean API for fetching content from Sanity.

### getHomepageContent()

Fetches the homepage singleton document.

**Signature:**
```typescript
async function getHomepageContent(preview?: boolean): Promise<Homepage>
```

**Parameters:**
- `preview` (boolean, optional): Enable draft/preview mode. Default: `false`

**Returns:**
- `Promise<Homepage>`: Homepage content with all fields

**Throws:**
- `Error`: If homepage document not found or invalid

**Example:**
```typescript
import { getHomepageContent } from '@/lib/cms'

// In a Server Component
export default async function HomePage() {
  const homepage = await getHomepageContent()

  return (
    <div>
      <h1>{homepage.name}</h1>
      <p>{homepage.title}</p>
    </div>
  )
}

// With draft mode
const draftHomepage = await getHomepageContent(true)
```

**Response Shape:**
```typescript
{
  name: string
  title: string
  tagline: string
  headshot: {
    url: string
    alt: string
  }
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
```

---

### getAllBlogPosts()

Fetches all published blog posts, sorted by date (newest first).

**Signature:**
```typescript
async function getAllBlogPosts(preview?: boolean): Promise<BlogPost[]>
```

**Parameters:**
- `preview` (boolean, optional): Enable draft/preview mode. Default: `false`

**Returns:**
- `Promise<BlogPost[]>`: Array of blog posts (may be empty)

**Example:**
```typescript
import { getAllBlogPosts } from '@/lib/cms'

const posts = await getAllBlogPosts()

posts.forEach(post => {
  console.log(post.title, post.publishedDate)
})
```

**Response Shape:**
```typescript
[
  {
    id: string
    title: string
    excerpt: string
    slug: string
    publishedDate: string  // ISO 8601 format
    thumbnail?: {
      url: string
      alt: string
    }
    author: string
    readingTime?: number  // in minutes
    content: string
  },
  ...
]
```

---

### getRecentBlogPosts()

Fetches recent blog posts with a limit.

**Signature:**
```typescript
async function getRecentBlogPosts(
  limit?: number,
  preview?: boolean
): Promise<BlogPost[]>
```

**Parameters:**
- `limit` (number, optional): Maximum number of posts. Default: `3`
- `preview` (boolean, optional): Enable draft/preview mode. Default: `false`

**Returns:**
- `Promise<BlogPost[]>`: Array of recent blog posts

**Example:**
```typescript
// Get 5 most recent posts
const recentPosts = await getRecentBlogPosts(5)

// Get default 3 posts
const featuredPosts = await getRecentBlogPosts()
```

---

### getBlogPostBySlug()

Fetches a single blog post by its slug.

**Signature:**
```typescript
async function getBlogPostBySlug(
  slug: string,
  preview?: boolean
): Promise<BlogPost | null>
```

**Parameters:**
- `slug` (string, required): URL slug of the blog post
- `preview` (boolean, optional): Enable draft/preview mode. Default: `false`

**Returns:**
- `Promise<BlogPost | null>`: Blog post if found, `null` otherwise

**Example:**
```typescript
const post = await getBlogPostBySlug('building-scalable-web-applications-nextjs')

if (!post) {
  notFound()  // Next.js 404
}

return <Article post={post} />
```

---

### getAllBlogSlugs()

Fetches all blog post slugs for static path generation.

**Signature:**
```typescript
async function getAllBlogSlugs(): Promise<string[]>
```

**Returns:**
- `Promise<string[]>`: Array of slug strings

**Example:**
```typescript
// In generateStaticParams
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()

  return slugs.map((slug) => ({
    slug,
  }))
}
```

---

### getAllProjects()

Fetches all projects, sorted by featured status and completion date.

**Signature:**
```typescript
async function getAllProjects(preview?: boolean): Promise<Project[]>
```

**Parameters:**
- `preview` (boolean, optional): Enable draft/preview mode. Default: `false`

**Returns:**
- `Promise<Project[]>`: Array of projects (may be empty)

**Response Shape:**
```typescript
[
  {
    id: string
    title: string
    description: string
    slug: string
    thumbnail?: {
      url: string
      alt: string
    }
    featured: boolean
    technologies?: string[]
    link?: string
    content: string
    challenge: string
    solution: string
    outcomes: string[]
    images?: Array<{
      url: string
      alt: string
    }>
    completionDate: string  // YYYY-MM format
    clientName?: string
  },
  ...
]
```

---

### getFeaturedProjects()

Fetches featured projects with a limit.

**Signature:**
```typescript
async function getFeaturedProjects(
  limit?: number,
  preview?: boolean
): Promise<Project[]>
```

**Parameters:**
- `limit` (number, optional): Maximum number of projects. Default: `3`
- `preview` (boolean, optional): Enable draft/preview mode. Default: `false`

**Returns:**
- `Promise<Project[]>`: Array of featured projects

**Example:**
```typescript
// Get 6 featured projects
const featured = await getFeaturedProjects(6)
```

---

### getProjectBySlug()

Fetches a single project by its slug.

**Signature:**
```typescript
async function getProjectBySlug(
  slug: string,
  preview?: boolean
): Promise<Project | null>
```

**Parameters:**
- `slug` (string, required): URL slug of the project
- `preview` (boolean, optional): Enable draft/preview mode. Default: `false`

**Returns:**
- `Promise<Project | null>`: Project if found, `null` otherwise

**Example:**
```typescript
const project = await getProjectBySlug('ecommerce-platform-redesign')

if (!project) {
  notFound()
}

return <ProjectDetails project={project} />
```

---

### getAllProjectSlugs()

Fetches all project slugs for static path generation.

**Signature:**
```typescript
async function getAllProjectSlugs(): Promise<string[]>
```

**Returns:**
- `Promise<string[]>`: Array of slug strings

---

## Sanity Client

Located in `src/lib/sanity/client.ts`.

### getClient()

Returns the appropriate Sanity client based on preview mode.

**Signature:**
```typescript
function getClient(preview?: boolean): SanityClient
```

**Parameters:**
- `preview` (boolean, optional): Use preview client with draft access

**Returns:**
- `SanityClient`: Configured client instance

**Clients:**
- **Production client**: CDN-enabled, fast reads, published content only
- **Preview client**: No CDN, authenticated, includes draft content

**Example:**
```typescript
import { getClient } from '@/lib/sanity/client'

const client = getClient()
const data = await client.fetch(query)

// With preview
const previewClient = getClient(true)
const draftData = await previewClient.fetch(query)
```

---

## GROQ Queries

Located in `src/lib/sanity/queries.ts`. These are the GROQ queries used to fetch data from Sanity.

### Homepage Query

```groq
*[_type == "homepage"][0] {
  _id,
  _type,
  name,
  title,
  tagline,
  "headshot": headshot {
    asset,
    alt,
    hotspot,
    crop
  },
  bio,
  socialLinks,
  contact
}
```

### Blog Post Queries

**All posts:**
```groq
*[_type == "post"] | order(publishedDate desc) {
  _id,
  _type,
  title,
  excerpt,
  "slug": slug.current,
  publishedDate,
  "thumbnail": thumbnail { ... },
  author,
  readingTime,
  content
}
```

**By slug:**
```groq
*[_type == "post" && slug.current == $slug][0] { ... }
```

**Recent posts:**
```groq
*[_type == "post"] | order(publishedDate desc) [0...$limit] { ... }
```

### Project Queries

**All projects:**
```groq
*[_type == "project"] | order(featured desc, completionDate desc) {
  _id,
  _type,
  title,
  description,
  "slug": slug.current,
  "thumbnail": thumbnail { ... },
  featured,
  technologies,
  link,
  content,
  challenge,
  solution,
  outcomes,
  "images": images[] { ... },
  completionDate,
  clientName
}
```

**Featured projects:**
```groq
*[_type == "project" && featured == true] | order(completionDate desc) [0...$limit] { ... }
```

---

## Data Mappers

Located in `src/lib/sanity/mappers.ts`. These functions transform Sanity responses into application types.

### mapHomepage()

Transforms Sanity homepage document to `Homepage` interface.

### mapPost()

Transforms Sanity post document to `BlogPost` interface.

### mapProject()

Transforms Sanity project document to `Project` interface.

### mapSanityImage()

Converts Sanity image reference to processed image with URL.

**Signature:**
```typescript
function mapSanityImage(
  image: SanityImage | undefined | null,
  fallbackAlt?: string
): ProcessedImage | undefined
```

---

## Image Utilities

Located in `src/lib/sanity/image.ts`.

### urlFor()

Generate a URL for a Sanity image with transformations.

**Signature:**
```typescript
function urlFor(source: Image): ImageUrlBuilder
```

**Example:**
```typescript
import { urlFor } from '@/lib/sanity/image'

const imageUrl = urlFor(sanityImage)
  .width(800)
  .height(600)
  .quality(90)
  .url()
```

### getImageUrl()

Generate an optimized image URL.

**Signature:**
```typescript
function getImageUrl(
  source: Image,
  width?: number,
  quality?: number
): string
```

**Parameters:**
- `source`: Sanity image reference
- `width` (optional): Desired width in pixels
- `quality` (optional): Quality 1-100. Default: `75`

**Example:**
```typescript
const url = getImageUrl(image, 1200, 85)
```

### getBlurPlaceholder()

Generate a low-quality placeholder for progressive loading.

**Signature:**
```typescript
function getBlurPlaceholder(source: Image): string
```

### generateSrcSet()

Generate srcset string for responsive images.

**Signature:**
```typescript
function generateSrcSet(
  source: Image,
  widths?: number[]
): string
```

**Default widths:** `[640, 750, 828, 1080, 1200, 1920]`

**Example:**
```typescript
const srcset = generateSrcSet(image)
// Returns: "https://...?w=640 640w, https://...?w=750 750w, ..."
```

---

## API Routes

### Draft Mode

**Enable Draft Mode:**
```http
GET /api/draft?secret=YOUR_SECRET&slug=/blog/post-slug
```

**Query Parameters:**
- `secret` (required): Matches `SANITY_REVALIDATE_SECRET`
- `slug` (required): Path to redirect to after enabling

**Response:**
- Redirects to specified slug with draft mode enabled
- Returns 401 if secret invalid
- Returns 400 if slug missing

**Disable Draft Mode:**
```http
GET /api/disable-draft
```

**Response:**
- Redirects to homepage with draft mode disabled

---

## Type Definitions

Located in `src/types/cms.ts`.

### Homepage
```typescript
interface Homepage {
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
```

### BlogPost
```typescript
interface BlogPost {
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
```

### Project
```typescript
interface Project {
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
```

### ProcessedImage
```typescript
interface ProcessedImage {
  url: string
  alt: string
}
```

---

## Error Handling

All CMS functions implement try-catch error handling:

```typescript
try {
  const data = await client.fetch(query)
  return mapData(data)
} catch (error) {
  console.error('Error fetching data:', error)
  return []  // or null for single items
}
```

**Homepage errors throw** because it's a required singleton.
**List functions return empty arrays** on error.
**Detail functions return null** on error (triggers 404).

---

## Best Practices

1. **Always use server components** for data fetching
2. **Enable ISR** with appropriate revalidation periods
3. **Handle null returns** for detail pages
4. **Use TypeScript** for full type safety
5. **Cache images** with proper srcset
6. **Monitor Sanity API usage** to stay within limits
7. **Use draft mode** for content preview

---

## Rate Limits

Sanity free tier:
- 100,000 API requests per month
- 10GB bandwidth per month
- ISR significantly reduces request count

---

## Support

For API issues:
- Check Sanity project status
- Verify environment variables
- Review query syntax in Vision tool
- Check network connectivity
- Monitor API usage in Sanity dashboard
