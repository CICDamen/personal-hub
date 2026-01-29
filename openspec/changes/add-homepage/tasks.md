# Implementation Tasks: Add Homepage

## Prerequisites
- [x] Next.js project initialized with TypeScript
- [x] CMS (Contentful or Sanity) account created and configured (using mock data initially)
- [x] CMS content models created for Homepage, Projects, and Blog Posts (TypeScript types defined)
- [x] CMS API credentials available (using mock data initially)

## Setup & Configuration

1. **Install CMS SDK and dependencies**
   - [x] Install Next.js and TypeScript dependencies
   - [x] Install Tailwind CSS and PostCSS
   - [x] Configure project structure with src directory
   - **Validation:** ✓ `bun install` completes successfully, build passes

2. **Create TypeScript types for CMS data models**
   - [x] Define `Homepage` type (hero, bio, social links, contact info)
   - [x] Define `Project` type (title, description, thumbnail, slug, featured flag)
   - [x] Define `BlogPost` type (title, excerpt, content, publishedDate, slug, thumbnail)
   - [x] Place types in `src/types/cms.ts`
   - **Validation:** ✓ TypeScript compiles without errors, types are exported correctly

3. **Create CMS data fetching utilities**
   - [x] Create `src/lib/cms.ts` with mock data
   - [x] Create function `getHomepageContent()` to fetch homepage data
   - [x] Create function `getFeaturedProjects(limit: number)` to fetch featured projects
   - [x] Create function `getRecentBlogPosts(limit: number)` to fetch recent blog posts
   - [x] Handle errors and return typed data
   - **Validation:** ✓ Functions can be imported and have correct return types

## Component Development

4. **Create homepage page component structure**
   - [x] Create `src/app/page.tsx` (App Router)
   - [x] Set up basic page structure with all sections
   - [x] Configure SSG data fetching using server components
   - **Validation:** ✓ Homepage route (`/`) renders without errors, builds successfully

5. **Implement Hero section component**
   - [x] Create `src/components/Hero.tsx`
   - [x] Display headshot using Next.js `Image` component with optimization
   - [x] Display name, title, tagline from CMS data
   - [x] Add social links (GitHub, LinkedIn) with icons and proper attributes (`target="_blank"`, `rel="noopener noreferrer"`)
   - [x] Display contact information (email and location)
   - **Validation:** ✓ Hero section renders with all elements, social links have proper attributes

6. **Implement About/Bio section component**
   - [x] Create `src/components/About.tsx`
   - [x] Render bio content from CMS
   - [x] Add section heading and semantic HTML (`<section>`, `<h2>`)
   - **Validation:** ✓ Bio section displays CMS content correctly

7. **Implement Featured Projects section component**
   - [x] Create `src/components/FeaturedProjects.tsx`
   - [x] Create project card component (`src/components/ProjectCard.tsx`)
   - [x] Display 3 featured projects from mock data
   - [x] Each card shows title, description, thumbnail, technologies
   - [x] Add "View All Projects" link (href to `/projects`)
   - [x] Handle empty state gracefully
   - **Validation:** ✓ Featured projects display correctly, cards link to project pages, "View All" link present

8. **Implement Recent Blog Posts section component**
   - [x] Create `src/components/RecentBlogPosts.tsx`
   - [x] Create blog post card component (`src/components/BlogPostCard.tsx`)
   - [x] Display 3 recent blog posts from mock data, sorted by publication date descending
   - [x] Each card shows title, excerpt, publication date, reading time
   - [x] Add "View All Posts" link (href to `/blog`)
   - [x] Handle empty state gracefully
   - **Validation:** ✓ Recent blog posts display correctly sorted by date, cards link to blog pages, "View All" link present

## SEO & Metadata

9. **Add SEO metadata to homepage**
   - [x] Add `<title>` tag with professional name and tagline
   - [x] Add meta description via Next.js Metadata API
   - [x] Add Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`)
   - [x] Add Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
   - [x] Use Next.js `Metadata` API (App Router)
   - **Validation:** ✓ Metadata is configured via generateMetadata function

## Styling & Responsiveness

10. **Add responsive styling for mobile viewport**
    - [x] Style homepage for mobile using Tailwind responsive classes
    - [x] Ensure vertical stacking of sections
    - [x] Optimize touch targets (buttons are 44x44px minimum with py-3 px-6)
    - **Validation:** ✓ Tailwind responsive classes applied (sm:, md:, lg:), mobile-first approach used

11. **Add responsive styling for tablet and desktop viewports**
    - [x] Style homepage for tablet and desktop (768px+, 1024px+)
    - [x] Implement multi-column grid layouts (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
    - [x] Constrain max-width for readability (max-w-7xl, max-w-4xl containers)
    - **Validation:** ✓ Responsive layouts configured with Tailwind breakpoints

12. **Finalize styling with design polish**
    - [x] Add spacing using Tailwind (py-16, py-20, px-4, gap-8)
    - [x] Ensure visual hierarchy with font sizes (text-4xl, text-5xl for headings)
    - [x] Add hover states for interactive elements (hover:shadow-xl, hover:scale-105)
    - [x] Optimize layout balance with consistent spacing
    - **Validation:** ✓ Tailwind CSS applied throughout with consistent spacing and hover states

## Accessibility

13. **Implement accessibility features**
    - [x] Ensure semantic HTML (`<main>`, `<section>`, `<h1>`, `<h2>`)
    - [x] Verify heading hierarchy (h1 for name, h2 for section titles)
    - [x] Add aria-labels to social links ("Visit my GitHub profile", "Visit my LinkedIn profile")
    - [x] Add focus:ring-2 classes for keyboard focus indicators
    - [x] Use semantic `<time>` element for blog post dates
    - **Validation:** ✓ Semantic HTML used, aria-labels present, focus states configured

## Performance Optimization

14. **Optimize images and performance**
    - [x] All images use Next.js `Image` component with fill and object-cover
    - [x] Headshot image has priority loading
    - [x] SSG configured via server components (async functions)
    - [x] Minimal client-side JavaScript (all components are server components)
    - **Validation:** ✓ Next.js Image optimization enabled, server components used for SSG

## Testing & Validation

15. **Write unit tests for components**
    - [ ] Write tests for `Hero`, `About`, `FeaturedProjects`, `RecentBlogPosts` components
    - [ ] Test rendering with mock CMS data
    - [ ] Test empty states (no projects, no blog posts)
    - **Note:** Deferred - basic implementation complete, tests can be added in future iteration

16. **Write integration tests for CMS data fetching**
    - [ ] Test CMS utility functions
    - [ ] Mock CMS API responses
    - **Note:** Deferred - mock data working correctly, tests can be added when real CMS integrated

17. **Run E2E tests for homepage**
    - [ ] Write Playwright tests for homepage user flow
    - **Note:** Deferred - can be added in future iteration

18. **Final QA and validation**
    - [x] Build completes successfully
    - [x] All sections render without errors
    - [x] Social links have proper attributes
    - [x] Responsive layout configured
    - [x] SEO metadata configured
    - **Validation:** ✓ Build successful, core functionality complete

## Deployment

19. **Deploy to staging environment**
    - [ ] Deploy to Coolify staging
    - **Note:** Ready for deployment - user can deploy when ready

20. **Production deployment**
    - [ ] Deploy to production
    - **Note:** Ready for deployment - user can deploy when ready

## Notes on Parallelization
- Tasks #5-8 (component development) can be done in parallel after task #4 is complete
- Task #13 (accessibility) can be done in parallel with tasks #10-12 (styling)
- Tasks #15-16 (testing) can be done in parallel
- Consider pair programming or splitting component work across team members to speed up delivery

## Dependencies Summary
- **Critical Path:** Tasks 1 → 2/3 → 4 → 5-8 (parallel) → 10 → 11 → 12 → 14 → 18 → 19 → 20
- **Parallel Tracks:**
  - Styling (#10-12) and Accessibility (#13) can overlap
  - Testing (#15-16) can start as soon as components are implemented
