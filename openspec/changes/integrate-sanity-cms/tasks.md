# Implementation Tasks: Sanity CMS Integration

## Prerequisites
- Sanity account and project already created for personal-hub
- Access to Sanity Studio for schema configuration

## 1. Sanity Schema Configuration

- [x] 1.1 Define Sanity schema for homepage document type (singleton)
- [x] 1.2 Define Sanity schema for post document type
- [x] 1.3 Define Sanity schema for project document type
- [x] 1.4 Configure slug fields with validation for posts and projects
- [x] 1.5 Test schemas in Sanity Studio
- [x] 1.6 Deploy schema changes to Sanity project

## 2. Content Migration

- [x] 2.1 Create homepage document in Sanity with current content
- [x] 2.2 Migrate 3 blog posts from mock data to Sanity
- [x] 2.3 Migrate 3 projects from mock data to Sanity
- [x] 2.4 Upload and configure image assets in Sanity (placeholder images uploaded, need to replace with real images)
- [ ] 2.5 Verify all content displays correctly in Sanity Studio
- [ ] 2.6 Test content editing workflow

## 3. Dependencies Installation

- [x] 3.1 Install `@sanity/client` package
- [x] 3.2 Install `next-sanity` package
- [x] 3.3 Install `@sanity/image-url` package
- [x] 3.4 Verify dependencies installed correctly

## 4. Environment Configuration

- [x] 4.1 Create `.env.local.example` with required environment variables template
- [x] 4.2 Add environment variables to `.env.local` for local development
- [x] 4.3 Document environment variables in README.md
- [x] 4.4 Verify `.env.local` is in `.gitignore`
- [x] 4.5 Document deployment environment variable configuration

## 5. Sanity Client Configuration

- [x] 5.1 Create `src/lib/sanity/client.ts` for Sanity client initialization
- [x] 5.2 Configure client with project ID, dataset, and API version
- [x] 5.3 Implement CDN mode for production reads
- [x] 5.4 Implement draft mode client configuration for preview
- [x] 5.5 Export configured client instances for use in CMS functions

## 6. Image URL Builder Setup

- [x] 6.1 Create `src/lib/sanity/image.ts` for image URL building
- [x] 6.2 Configure `@sanity/image-url` with Sanity project settings
- [x] 6.3 Implement helper functions for common image transformations
- [x] 6.4 Create Next.js Image component custom loader for Sanity CDN
- [x] 6.5 Add utility functions for responsive image srcset generation

## 7. TypeScript Type Updates

- [x] 7.1 Review existing types in `src/types/cms.ts`
- [x] 7.2 Add Sanity-specific metadata types (image references, document IDs)
- [x] 7.3 Create type guards for validating Sanity responses
- [x] 7.4 Ensure backward compatibility with existing component interfaces
- [x] 7.5 Add JSDoc comments for new Sanity-specific types

## 8. GROQ Query Implementation

- [x] 8.1 Create `src/lib/sanity/queries.ts` for GROQ query definitions
- [x] 8.2 Write GROQ query for homepage singleton
- [x] 8.3 Write GROQ queries for blog posts (all, by slug, slugs only, recent)
- [x] 8.4 Write GROQ queries for projects (all, by slug, slugs only, featured)
- [x] 8.5 Add field projections for all required TypeScript interface fields
- [x] 8.6 Test queries in Sanity Studio Vision tool

## 9. CMS Functions Rewrite

- [x] 9.1 Update `getHomepageContent()` to fetch from Sanity
- [x] 9.2 Update `getAllBlogPosts()` to fetch from Sanity
- [x] 9.3 Update `getRecentBlogPosts(limit)` to fetch from Sanity
- [x] 9.4 Update `getBlogPostBySlug(slug)` to fetch from Sanity
- [x] 9.5 Update `getAllBlogSlugs()` to fetch from Sanity
- [x] 9.6 Update `getAllProjects()` to fetch from Sanity
- [x] 9.7 Update `getFeaturedProjects(limit)` to fetch from Sanity
- [x] 9.8 Update `getProjectBySlug(slug)` to fetch from Sanity
- [x] 9.9 Update `getAllProjectSlugs()` to fetch from Sanity
- [x] 9.10 Add error handling and logging for each function
- [x] 9.11 Remove mock data constants and helper functions

## 10. Response Mapping

- [x] 10.1 Implement mapper functions to transform Sanity responses to TypeScript interfaces
- [x] 10.2 Handle image reference transformation to URLs
- [x] 10.3 Ensure all optional fields have proper defaults
- [x] 10.4 Add null/undefined checks for defensive programming
- [x] 10.5 Test mapping functions with sample Sanity data

## 11. Page Component Updates

- [x] 11.1 Add revalidate export to homepage (src/app/page.tsx) with 1800 seconds
- [x] 11.2 Add revalidate export to blog listing page with 3600 seconds
- [x] 11.3 Add revalidate export to blog post page with 3600 seconds
- [x] 11.4 Add revalidate export to project listing page with 3600 seconds
- [x] 11.5 Add revalidate export to project detail page with 3600 seconds
- [x] 11.6 Verify generateStaticParams functions work with new Sanity slug fetching

## 12. Draft Mode Implementation

- [x] 12.1 Create draft mode API route (src/app/api/draft/route.ts)
- [x] 12.2 Implement draft mode enable/disable logic
- [x] 12.3 Add preview URL configuration for Sanity Studio
- [x] 12.4 Test draft content rendering before publishing
- [x] 12.5 Verify published content not affected by draft mode

## 13. Error Handling and Logging

- [x] 13.1 Add try-catch blocks to all Sanity API calls
- [x] 13.2 Implement graceful error messages for missing content
- [x] 13.3 Add console warnings for development debugging
- [x] 13.4 Handle network failures with appropriate fallbacks
- [x] 13.5 Test error scenarios (missing documents, invalid queries)

## 14. Testing and Validation

- [ ] 14.1 Test homepage renders with Sanity data
- [ ] 14.2 Test blog listing page renders all posts from Sanity
- [ ] 14.3 Test blog post detail pages render individual posts
- [ ] 14.4 Test project listing page renders all projects from Sanity
- [ ] 14.5 Test project detail pages render individual projects
- [ ] 14.6 Test featured projects and recent blog posts on homepage
- [ ] 14.7 Verify images load and display correctly with Sanity CDN
- [ ] 14.8 Test responsive image behavior on different screen sizes
- [ ] 14.9 Test ISR behavior (page regeneration after revalidation period)
- [ ] 14.10 Test 404 behavior for non-existent slugs

## 15. Performance Verification

- [ ] 15.1 Run Lighthouse audit on homepage
- [ ] 15.2 Run Lighthouse audit on blog pages
- [ ] 15.3 Run Lighthouse audit on project pages
- [ ] 15.4 Verify First Contentful Paint < 1.5s
- [ ] 15.5 Verify Lighthouse score > 90 for all metrics
- [ ] 15.6 Check image optimization with Sanity CDN
- [ ] 15.7 Verify ISR cache behavior

## 16. Documentation Updates

- [x] 16.1 Update README.md with Sanity integration instructions
- [x] 16.2 Document environment variable setup
- [x] 16.3 Add Sanity Studio access instructions
- [x] 16.4 Document content model and schema location
- [x] 16.5 Remove references to mock data from documentation
- [x] 16.6 Add troubleshooting section for common Sanity issues

## 17. Deployment Preparation

- [x] 17.1 Verify `.env.local.example` is complete and accurate
- [ ] 17.2 Document deployment environment variable configuration process
- [ ] 17.3 Test build process with Sanity integration
- [ ] 17.4 Verify no build errors or warnings
- [ ] 17.5 Confirm all TypeScript types compile without errors
- [ ] 17.6 Run linting and fix any issues

## 18. Final Validation

- [ ] 18.1 Complete end-to-end smoke test of all pages
- [ ] 18.2 Verify content updates in Sanity reflect on website after revalidation
- [ ] 18.3 Test draft mode workflow from Sanity Studio
- [ ] 18.4 Confirm error handling works for edge cases
- [ ] 18.5 Review code for any remaining mock data references
- [ ] 18.6 Confirm all tasks in this list are completed
