# Change: Integrate Sanity CMS for Content Management

## Why

The application currently uses mock data hardcoded in `src/lib/cms.ts`, making content updates require code changes and deployments. Integrating Sanity CMS will enable non-technical content editing, support rich media management, provide version control for content, and enable content preview capabilities.

## What Changes

- Replace mock data implementation with Sanity client integration
- Add Sanity schema definitions for Homepage, Projects, and Blog Posts
- Implement image asset handling through Sanity's CDN
- Add environment configuration for Sanity project credentials
- Update CMS functions to fetch data from Sanity API instead of mock data
- Add incremental static regeneration (ISR) for dynamic content updates
- Implement draft mode for content previews

## Impact

- **Affected specs**: `content-management`, `image-assets` (new capabilities)
- **Affected code**:
  - `src/lib/cms.ts` - Complete rewrite to use Sanity client
  - `src/types/cms.ts` - Extended with Sanity-specific types
  - `src/app/**/page.tsx` - Add revalidation and draft mode support
  - Environment configuration (`.env.local`, deployment settings)
- **Dependencies**: New packages required (`@sanity/client`, `next-sanity`, `@sanity/image-url`)
- **External services**: Requires Sanity account and project setup
- **Breaking changes**: None (maintains existing API surface)
