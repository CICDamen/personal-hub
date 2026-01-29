# Capability: Content Management

## ADDED Requirements

### Requirement: Sanity CMS Client Configuration
The system SHALL provide a configured Sanity client that connects to the Sanity project with appropriate credentials and API version.

#### Scenario: Client initialization with environment variables
- **WHEN** the application starts
- **THEN** the Sanity client is initialized with project ID from `NEXT_PUBLIC_SANITY_PROJECT_ID`
- **AND** the dataset from `NEXT_PUBLIC_SANITY_DATASET`
- **AND** API version set to `2024-01-01` or later
- **AND** the client is configured to use CDN for production reads

#### Scenario: Draft mode client configuration
- **WHEN** draft mode is enabled for preview
- **THEN** the Sanity client uses the API token from `SANITY_API_TOKEN`
- **AND** bypasses CDN cache to fetch draft content
- **AND** returns unpublished document versions

### Requirement: Homepage Content Retrieval
The system SHALL fetch homepage content from Sanity CMS and map it to the existing Homepage interface.

#### Scenario: Fetch published homepage content
- **WHEN** `getHomepageContent()` is called
- **THEN** the system queries Sanity for the homepage singleton document
- **AND** maps the response to the Homepage TypeScript interface
- **AND** returns structured data including name, title, tagline, headshot, bio, social links, and contact information
- **AND** includes image URLs optimized through Sanity CDN

#### Scenario: Homepage content not found
- **WHEN** `getHomepageContent()` is called
- **AND** no homepage document exists in Sanity
- **THEN** the system throws an error or returns null
- **AND** the application handles the missing content gracefully

### Requirement: Blog Post Content Retrieval
The system SHALL fetch blog post content from Sanity CMS and map it to the existing BlogPost interface.

#### Scenario: Fetch all blog posts
- **WHEN** `getAllBlogPosts()` is called
- **THEN** the system queries Sanity for all published post documents
- **AND** sorts results by publishedDate in descending order (newest first)
- **AND** maps each post to the BlogPost TypeScript interface
- **AND** returns an array of blog posts with id, title, excerpt, slug, publishedDate, thumbnail, author, readingTime, and content

#### Scenario: Fetch recent blog posts with limit
- **WHEN** `getRecentBlogPosts(limit)` is called with a limit parameter
- **THEN** the system queries Sanity for published posts
- **AND** applies the limit to return only the specified number of posts
- **AND** sorts by publishedDate descending
- **AND** returns the most recent N posts

#### Scenario: Fetch blog post by slug
- **WHEN** `getBlogPostBySlug(slug)` is called with a valid slug
- **THEN** the system queries Sanity for a post document matching the slug
- **AND** returns the complete BlogPost object if found
- **AND** returns null if no post matches the slug

#### Scenario: Fetch all blog slugs for static generation
- **WHEN** `getAllBlogSlugs()` is called
- **THEN** the system queries Sanity for all published post slugs
- **AND** returns an array of slug strings
- **AND** the slugs are used for Next.js static path generation

### Requirement: Project Content Retrieval
The system SHALL fetch project content from Sanity CMS and map it to the existing Project interface.

#### Scenario: Fetch all projects
- **WHEN** `getAllProjects()` is called
- **THEN** the system queries Sanity for all published project documents
- **AND** sorts results with featured projects first
- **AND** maps each project to the Project TypeScript interface
- **AND** returns an array including id, title, description, slug, thumbnail, featured flag, technologies, content, challenge, solution, outcomes, images, completionDate, and clientName

#### Scenario: Fetch featured projects with limit
- **WHEN** `getFeaturedProjects(limit)` is called
- **THEN** the system queries Sanity for projects where featured is true
- **AND** applies the limit to return only the specified number of projects
- **AND** returns the featured projects array

#### Scenario: Fetch project by slug
- **WHEN** `getProjectBySlug(slug)` is called with a valid slug
- **THEN** the system queries Sanity for a project document matching the slug
- **AND** returns the complete Project object if found
- **AND** returns null if no project matches the slug

#### Scenario: Fetch all project slugs for static generation
- **WHEN** `getAllProjectSlugs()` is called
- **THEN** the system queries Sanity for all published project slugs
- **AND** returns an array of slug strings
- **AND** the slugs are used for Next.js static path generation

### Requirement: GROQ Query Implementation
The system SHALL use GROQ (Graph-Relational Object Queries) to fetch content from Sanity with appropriate field projections.

#### Scenario: Query with field projection
- **WHEN** fetching content from Sanity
- **THEN** the system uses GROQ queries with explicit field projections
- **AND** includes all required fields for the TypeScript interface
- **AND** handles nested objects like images and arrays
- **AND** uses proper GROQ syntax for filtering and ordering

#### Scenario: Query for unpublished content in draft mode
- **WHEN** draft mode is active
- **THEN** GROQ queries include draft documents
- **AND** prioritize draft versions over published versions
- **AND** return the most recent document revision

### Requirement: Content Caching and Revalidation
The system SHALL implement incremental static regeneration (ISR) for cached content with appropriate revalidation intervals.

#### Scenario: Homepage revalidation
- **WHEN** homepage content is requested
- **THEN** Next.js serves cached static content if available
- **AND** revalidates the content every 1800 seconds (30 minutes)
- **AND** regenerates the page in the background when stale

#### Scenario: Blog post revalidation
- **WHEN** a blog post page is requested
- **THEN** Next.js serves cached static content if available
- **AND** revalidates the content every 3600 seconds (1 hour)
- **AND** regenerates the page in the background when stale

#### Scenario: Project page revalidation
- **WHEN** a project page is requested
- **THEN** Next.js serves cached static content if available
- **AND** revalidates the content every 3600 seconds (1 hour)
- **AND** regenerates the page in the background when stale

### Requirement: Error Handling
The system SHALL handle Sanity API errors gracefully and provide appropriate fallbacks or error messages.

#### Scenario: Network error during content fetch
- **WHEN** a Sanity API request fails due to network issues
- **THEN** the system logs the error with context
- **AND** returns null or throws an appropriate error
- **AND** allows Next.js to serve stale content via ISR if available

#### Scenario: Invalid query or missing fields
- **WHEN** a GROQ query is malformed or references non-existent fields
- **THEN** Sanity returns an error response
- **AND** the system logs the query error with details
- **AND** returns null or throws an error to be handled by the page component

#### Scenario: Rate limit exceeded
- **WHEN** Sanity API rate limits are exceeded
- **THEN** the system logs the rate limit error
- **AND** allows ISR to serve cached content
- **AND** retries the request on subsequent revalidation cycles
