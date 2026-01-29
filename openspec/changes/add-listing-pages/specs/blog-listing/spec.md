# Blog Listing Page Specification

## ADDED Requirements

### Requirement: Blog Listing Route
The system SHALL provide a blog listing page accessible at `/blog` that displays all blog posts.

#### Scenario: Access blog listing page
- **WHEN** a user navigates to `/blog`
- **THEN** the system displays a page with all blog posts

#### Scenario: Static page generation
- **WHEN** the application is built for production
- **THEN** the blog listing page is generated as a static page (SSG)

### Requirement: Blog Posts Display
The system SHALL display all blog posts as cards in a responsive grid layout, sorted by publication date descending (newest first).

#### Scenario: Blog posts grid display
- **WHEN** the blog listing page loads
- **THEN** all blog posts are displayed in a grid with:
  - Title, excerpt, publication date, reading time
  - Thumbnail image (if available)
  - Author name
  - Responsive grid: 1 column on mobile, 2 columns on tablet, 3 columns on desktop

#### Scenario: Blog posts sorted by date
- **WHEN** multiple blog posts exist
- **THEN** posts are displayed in descending order by publication date (newest first)

#### Scenario: Empty state handling
- **WHEN** no blog posts exist
- **THEN** the page displays a message: "No blog posts yet. Check back soon!"

### Requirement: Blog Post Card Navigation
The system SHALL make each blog post card clickable, navigating to the corresponding blog post detail page.

#### Scenario: Navigate to blog post detail
- **WHEN** a user clicks on a blog post card
- **THEN** the system navigates to `/blog/[slug]` for that post

#### Scenario: Card hover interaction
- **WHEN** a user hovers over a blog post card
- **THEN** the card displays visual feedback (shadow, scale, or color change)

### Requirement: Blog Listing Page Layout
The system SHALL provide a page layout with header, blog posts grid, and responsive design.

#### Scenario: Page header
- **WHEN** the blog listing page loads
- **THEN** the page displays:
  - Page title "Blog" as h1 heading
  - Optional subtitle or description
  - Breadcrumb or back navigation to homepage

#### Scenario: Responsive layout
- **WHEN** the blog listing page is viewed on different devices
- **THEN** the layout adapts: mobile (1 column), tablet (2 columns), desktop (3 columns)

### Requirement: Blog Listing Metadata
The system SHALL generate SEO metadata for the blog listing page including title, description, and Open Graph tags.

#### Scenario: SEO metadata generation
- **WHEN** the blog listing page is accessed
- **THEN** the page includes:
  - Title tag: "Blog | Casper Damen"
  - Meta description summarizing blog content
  - Open Graph tags for social sharing
  - Canonical URL

### Requirement: Blog Posts Data Fetching
The system SHALL provide a CMS utility function to fetch all blog posts.

#### Scenario: Fetch all blog posts
- **WHEN** `getAllBlogPosts()` is called
- **THEN** the function returns an array of all blog posts sorted by publication date descending

#### Scenario: Handle empty blog posts
- **WHEN** `getAllBlogPosts()` is called and no posts exist
- **THEN** the function returns an empty array
