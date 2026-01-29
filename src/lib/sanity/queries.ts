/**
 * GROQ queries for fetching content from Sanity
 *
 * GROQ (Graph-Relational Object Queries) is Sanity's query language
 * See: https://www.sanity.io/docs/groq
 */

/**
 * Field projections for common data types
 */

// Image field projection with all metadata
const imageProjection = `
  asset,
  alt,
  hotspot,
  crop
`

/**
 * Homepage Queries
 */

// Fetch the homepage singleton document
export const homepageQuery = `
  *[_type == "homepage"][0] {
    _id,
    _type,
    name,
    title,
    tagline,
    "headshot": headshot {
      ${imageProjection}
    },
    bio,
    socialLinks,
    contact
  }
`

/**
 * Blog Post Queries
 */

// Fetch all published blog posts, sorted by date (newest first)
export const allPostsQuery = `
  *[_type == "post"] | order(publishedDate desc) {
    _id,
    _type,
    title,
    excerpt,
    "slug": slug.current,
    publishedDate,
    "thumbnail": thumbnail {
      ${imageProjection}
    },
    author,
    readingTime,
    content
  }
`

// Fetch a single blog post by slug
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    excerpt,
    "slug": slug.current,
    publishedDate,
    "thumbnail": thumbnail {
      ${imageProjection}
    },
    author,
    readingTime,
    content
  }
`

// Fetch all blog post slugs for static generation
export const allPostSlugsQuery = `
  *[_type == "post"] {
    "slug": slug.current
  }
`

// Fetch recent blog posts with limit
export const recentPostsQuery = `
  *[_type == "post"] | order(publishedDate desc) [0...$limit] {
    _id,
    _type,
    title,
    excerpt,
    "slug": slug.current,
    publishedDate,
    "thumbnail": thumbnail {
      ${imageProjection}
    },
    author,
    readingTime,
    content
  }
`

/**
 * Project Queries
 */

// Fetch all projects, sorted by featured status and completion date
export const allProjectsQuery = `
  *[_type == "project"] | order(featured desc, completionDate desc) {
    _id,
    _type,
    title,
    description,
    "slug": slug.current,
    "thumbnail": thumbnail {
      ${imageProjection}
    },
    featured,
    technologies,
    link,
    content,
    challenge,
    solution,
    outcomes,
    "images": images[] {
      ${imageProjection}
    },
    completionDate,
    clientName
  }
`

// Fetch a single project by slug
export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    description,
    "slug": slug.current,
    "thumbnail": thumbnail {
      ${imageProjection}
    },
    featured,
    technologies,
    link,
    content,
    challenge,
    solution,
    outcomes,
    "images": images[] {
      ${imageProjection}
    },
    completionDate,
    clientName
  }
`

// Fetch all project slugs for static generation
export const allProjectSlugsQuery = `
  *[_type == "project"] {
    "slug": slug.current
  }
`

// Fetch featured projects with limit
export const featuredProjectsQuery = `
  *[_type == "project" && featured == true] | order(completionDate desc) [0...$limit] {
    _id,
    _type,
    title,
    description,
    "slug": slug.current,
    "thumbnail": thumbnail {
      ${imageProjection}
    },
    featured,
    technologies,
    link,
    content,
    challenge,
    solution,
    outcomes,
    "images": images[] {
      ${imageProjection}
    },
    completionDate,
    clientName
  }
`

/**
 * Type guard to check if a query result is non-null
 * @param result - Query result to check
 * @returns True if result exists
 */
export function assertQueryResult<T>(
  result: T | null,
  errorMessage: string = 'Query returned no results'
): asserts result is T {
  if (!result) {
    throw new Error(errorMessage)
  }
}
