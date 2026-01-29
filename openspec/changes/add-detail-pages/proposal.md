# Proposal: Add Detail Pages for Blog Posts and Projects

## Why

Users clicking on blog post cards or project cards from the homepage currently have nowhere to land. The application needs dedicated detail pages that display full content for individual blog posts and comprehensive information for individual projects/case studies. These pages are essential for the core user journeys: reading blog content and exploring client work.

## What Changes

- Create dynamic route `/blog/[slug]` for individual blog post detail pages
- Create dynamic route `/projects/[slug]` for individual project detail pages
- Extend CMS types (`BlogPost` and `Project`) to include full content fields
- Add CMS utility functions to fetch individual blog posts and projects by slug
- Implement blog post detail page component with full content, metadata, and navigation
- Implement project detail page component with comprehensive project information, images, and outcomes
- Extend mock data to include full blog post content and detailed project information
- Add SEO metadata for individual blog and project pages
- Implement responsive layouts for detail page content
- Add "Back to [Blog/Projects]" navigation links

## Impact

**Affected specs:**
- `blog-detail-pages` (new capability)
- `project-detail-pages` (new capability)

**Affected code:**
- `src/types/cms.ts` - Extend `BlogPost` and `Project` interfaces with content fields
- `src/lib/cms.ts` - Add functions: `getBlogPostBySlug()`, `getProjectBySlug()`, `getAllBlogSlugs()`, `getAllProjectSlugs()`
- `src/app/blog/[slug]/page.tsx` - New blog detail page (dynamic route)
- `src/app/projects/[slug]/page.tsx` - New project detail page (dynamic route)
- New components for rendering blog and project content
- Mock data updates in `src/lib/cms.ts`

**Dependencies:**
- Builds on `add-homepage` change (uses existing CMS infrastructure and types)
- These pages are linked from homepage components (`BlogPostCard.tsx`, `ProjectCard.tsx`)

**User value:**
- Blog readers can access full article content and engage with professional insights
- Potential clients can review detailed case studies with outcomes and technical approaches
- SEO benefits from individual content pages with proper metadata
- Navigation between content is seamless (homepage → detail → back)
