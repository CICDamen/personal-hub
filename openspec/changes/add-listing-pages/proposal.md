# Proposal: Add Listing Pages for Blog Posts and Projects

## Why

Users clicking "View All Posts" or "View All Projects" links from the homepage currently encounter 404 errors because the `/blog` and `/projects` routes don't exist. The application needs dedicated listing pages that display all blog posts and projects, allowing users to browse the complete content catalog and navigate to individual detail pages.

## What Changes

- Create static route `/blog` for blog posts listing page
- Create static route `/projects` for projects listing page
- Add CMS utility functions to fetch all blog posts and all projects
- Implement blog listing page component with card grid layout and sorting
- Implement project listing page component with card grid layout
- Add SEO metadata for listing pages
- Implement responsive grid layouts (1-3 columns based on viewport)
- Add filtering/search capabilities (optional, marked as future enhancement)

## Impact

**Affected specs:**
- `blog-listing` (new capability)
- `project-listing` (new capability)

**Affected code:**
- `src/lib/cms.ts` - Add functions: `getAllBlogPosts()`, `getAllProjects()`
- `src/app/blog/page.tsx` - New blog listing page (static route)
- `src/app/projects/page.tsx` - New project listing page (static route)
- Reuse existing card components: `BlogPostCard.tsx`, `ProjectCard.tsx`

**Dependencies:**
- Builds on `add-homepage` change (uses existing card components)
- Builds on `add-detail-pages` change (links to detail pages)
- Completes the navigation paths from homepage → listing → detail

**User value:**
- Users can browse all blog posts in one place, sorted by publication date
- Users can view all projects in one place to explore complete portfolio
- "View All" links from homepage now work correctly
- SEO benefits from dedicated listing pages with comprehensive metadata
- Users can discover content they might miss from homepage previews
