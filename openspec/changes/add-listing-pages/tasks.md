# Implementation Tasks: Add Listing Pages

## Prerequisites
- [x] Homepage implemented with card components (`add-homepage` change)
- [x] Detail pages implemented for blog and projects (`add-detail-pages` change)
- [x] Card components exist: `BlogPostCard.tsx`, `ProjectCard.tsx`
- [x] CMS utility functions for fetching featured/recent items exist

## 1. Add CMS Utility Functions

### 1.1 Add function to fetch all blog posts
- [x] Implement `getAllBlogPosts(): Promise<BlogPost[]>` in `src/lib/cms.ts`
- [x] Sort blog posts by publication date descending (newest first)
- [x] Return all blog posts from mock data
- **Validation:** ✓ Function returns sorted array of all blog posts

### 1.2 Add function to fetch all projects
- [x] Implement `getAllProjects(): Promise<Project[]>` in `src/lib/cms.ts`
- [x] Sort projects with featured projects first
- [x] Return all projects from mock data
- **Validation:** ✓ Function returns array with featured projects first

## 2. Implement Blog Listing Page

### 2.1 Create blog listing page route
- [x] Create `src/app/blog/page.tsx` with async component
- [x] Fetch all blog posts using `getAllBlogPosts()` in page component
- [x] Implement page as static generation (SSG)
- **Validation:** ✓ Route `/blog` renders without errors

### 2.2 Implement blog listing page layout
- [x] Create page header with "Blog" as h1 heading
- [x] Add optional subtitle or description
- [x] Add "Back to Home" navigation link
- [x] Add semantic HTML structure (`<main>`, `<section>`, `<h1>`)
- **Validation:** ✓ Page header displays correctly with semantic HTML

### 2.3 Implement blog posts grid
- [x] Create responsive grid container for blog post cards
- [x] Map through blog posts and render `BlogPostCard` component for each
- [x] Configure grid: 1 column mobile, 2 columns tablet, 3 columns desktop
- [x] Add spacing between cards (gap-6 or gap-8)
- **Validation:** ✓ Blog posts display in responsive grid layout

### 2.4 Handle empty state
- [x] Add conditional rendering for empty blog posts array
- [x] Display "No blog posts yet. Check back soon!" message when empty
- [x] Style empty state message appropriately
- **Validation:** ✓ Empty state displays when no blog posts exist

### 2.5 Add blog listing metadata
- [x] Implement `generateMetadata()` export for SEO
- [x] Add title: "Blog | Casper Damen"
- [x] Add meta description summarizing blog content
- [x] Add Open Graph tags (og:title, og:description, og:type)
- [x] Add Twitter Card tags
- **Validation:** ✓ Metadata appears in page source

### 2.6 Style blog listing page responsively
- [x] Apply Tailwind responsive classes (sm:, md:, lg:)
- [x] Constrain max-width of content container (max-w-7xl)
- [x] Add padding and spacing (py-16, px-4)
- [x] Ensure consistent styling with homepage
- **Validation:** ✓ Page renders well on mobile, tablet, desktop

## 3. Implement Project Listing Page

### 3.1 Create project listing page route
- [x] Create `src/app/projects/page.tsx` with async component
- [x] Fetch all projects using `getAllProjects()` in page component
- [x] Implement page as static generation (SSG)
- **Validation:** ✓ Route `/projects` renders without errors

### 3.2 Implement project listing page layout
- [x] Create page header with "Projects" as h1 heading
- [x] Add optional subtitle describing portfolio
- [x] Add "Back to Home" navigation link
- [x] Add semantic HTML structure (`<main>`, `<section>`, `<h1>`)
- **Validation:** ✓ Page header displays correctly with semantic HTML

### 3.3 Implement projects grid
- [x] Create responsive grid container for project cards
- [x] Map through projects and render `ProjectCard` component for each
- [x] Configure grid: 1 column mobile, 2 columns tablet, 3 columns desktop
- [x] Add spacing between cards (gap-6 or gap-8)
- **Validation:** ✓ Projects display in responsive grid layout

### 3.4 Handle empty state
- [x] Add conditional rendering for empty projects array
- [x] Display "No projects yet. Check back soon!" message when empty
- [x] Style empty state message appropriately
- **Validation:** ✓ Empty state displays when no projects exist

### 3.5 Add project listing metadata
- [x] Implement `generateMetadata()` export for SEO
- [x] Add title: "Projects | Casper Damen"
- [x] Add meta description summarizing project portfolio
- [x] Add Open Graph tags (og:title, og:description, og:type)
- [x] Add Twitter Card tags
- **Validation:** ✓ Metadata appears in page source

### 3.6 Style project listing page responsively
- [x] Apply Tailwind responsive classes (sm:, md:, lg:)
- [x] Constrain max-width of content container (max-w-7xl)
- [x] Add padding and spacing (py-16, px-4)
- [x] Ensure consistent styling with homepage and blog listing
- **Validation:** ✓ Page renders well on mobile, tablet, desktop

## 4. Accessibility and Polish

### 4.1 Ensure accessibility compliance
- [x] Verify semantic HTML in both listing pages
- [x] Check heading hierarchy (h1 for page title, h2 for card titles)
- [x] Add ARIA labels to navigation links ("Back to Home")
- [x] Ensure cards are keyboard accessible (tab navigation)
- [x] Test focus states visible on all interactive elements
- **Validation:** ✓ Pages use semantic HTML, keyboard navigation works

### 4.2 Consistent styling and UX
- [x] Ensure listing pages match homepage styling
- [x] Verify card components render consistently
- [x] Check hover states work on all cards
- [x] Ensure loading states handled gracefully (if applicable)
- **Validation:** ✓ Styling is consistent across all pages

## 5. Testing and Validation

### 5.1 Manual testing
- [x] Test blog listing page at `/blog` loads correctly
- [x] Test project listing page at `/projects` loads correctly
- [x] Click "View All Posts" from homepage → navigates to `/blog`
- [x] Click "View All Projects" from homepage → navigates to `/projects`
- [x] Click blog post cards → navigates to detail pages
- [x] Click project cards → navigates to detail pages
- [x] Test empty states (temporarily empty mock data)
- **Validation:** ✓ All navigation paths work correctly

### 5.2 Responsive testing
- [x] Test blog listing on mobile (375px width)
- [x] Test blog listing on tablet (768px width)
- [x] Test blog listing on desktop (1024px+ width)
- [x] Test project listing on mobile (375px width)
- [x] Test project listing on tablet (768px width)
- [x] Test project listing on desktop (1024px+ width)
- **Validation:** ✓ Layouts adapt correctly across breakpoints

### 5.3 Build and SSG validation
- [x] Run `bun run build` successfully
- [x] Verify static pages generated for `/blog` and `/projects`
- [x] Check build output confirms SSG for listing routes
- [x] Test production build locally with `bun run start`
- **Validation:** ✓ Build completes without errors, pages are static

## 6. Final Checks

### 6.1 Code quality
- [x] Run TypeScript compiler (`tsc --noEmit`) with no errors
- [x] Run linter (`bun run lint`) with no errors
- [x] Ensure consistent code style across new files
- [x] Remove any console.logs or debug code
- **Validation:** ✓ TypeScript and linter pass, code is clean

### 6.2 Integration verification
- [x] Verify all homepage links work (blog, projects, detail pages)
- [x] Verify all listing page links work (cards to detail pages)
- [x] Verify all detail page "Back" links work (to listing pages)
- [x] Check complete user journey: home → listing → detail → back
- **Validation:** ✓ All navigation paths complete successfully

## Notes on Implementation

**Simple approach:**
- Reuse existing `BlogPostCard` and `ProjectCard` components (no changes needed)
- Use same grid layout pattern from homepage (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Keep styling consistent with homepage for cohesive UX

**CMS functions:**
- `getAllBlogPosts()` - Returns full blog posts array sorted by date descending
- `getAllProjects()` - Returns full projects array with featured first

**Future enhancements (out of scope):**
- Search/filter functionality
- Pagination for large content sets
- Category/tag filtering
- Sort options (date, title, etc.)
