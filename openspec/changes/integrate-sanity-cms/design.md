# Design: Sanity CMS Integration

## Context

The personal-hub application currently uses hardcoded mock data for all content (homepage, blog posts, projects). This requires code changes and deployments for every content update, which is not scalable or user-friendly. The README.md already mentions Sanity integration as a planned feature, and the project conventions in `openspec/project.md` specify headless CMS (Contentful or Sanity) as the intended backend.

**Constraints:**
- Must maintain existing TypeScript interfaces and API surface to avoid breaking existing page components
- Application is built with Next.js 15 (App Router)
- Performance targets: Lighthouse >90, FCP <1.5s
- SEO requirements: Server-side rendering with fresh content

**Stakeholders:**
- Content editors (need web-based content management)
- Developers (need clean API integration)
- End users (need fast page loads and fresh content)

## Goals / Non-Goals

**Goals:**
- Replace mock data with real Sanity CMS content
- Enable non-technical content editing through Sanity Studio
- Support image optimization via Sanity CDN
- Implement draft/preview mode for content review before publishing
- Maintain or improve current page performance
- Support incremental static regeneration for content freshness

**Non-Goals:**
- Custom Sanity Studio deployment (use Sanity's hosted studio)
- Multi-language content (can be added later)
- Content versioning/rollback UI (Sanity provides this)
- Real-time collaboration features (Sanity provides this)
- Custom image processing beyond Sanity's built-in capabilities

## Decisions

### Decision 1: Use Sanity.io as CMS Provider

**Why Sanity over Contentful:**
- Better developer experience with TypeScript
- More flexible schema customization with code-first approach
- Superior image handling with automatic optimization
- Real-time collaboration features built-in
- Generous free tier suitable for personal portfolio
- Easier local development with portable configuration

**Alternatives considered:**
- Contentful: More enterprise-focused, less flexible schema, higher cost
- Strapi: Self-hosted complexity not justified for this scale
- Custom backend: Unnecessary development and maintenance burden

### Decision 2: Use next-sanity Package

The `next-sanity` package provides Next.js-optimized utilities including:
- Draft mode integration
- Revalidation helpers
- Image component integration
- Optimized client configuration

**Why not plain @sanity/client:**
- next-sanity provides Next.js-specific optimizations
- Built-in draft mode support
- Better TypeScript integration
- Maintained by Sanity team specifically for Next.js

### Decision 3: Incremental Static Regeneration (ISR) Strategy

**Approach:**
- Blog posts: Revalidate every 3600 seconds (1 hour)
- Projects: Revalidate every 3600 seconds (1 hour)
- Homepage: Revalidate every 1800 seconds (30 minutes)

**Rationale:**
- Balances content freshness with build/CDN efficiency
- Homepage changes more frequently (featured content)
- Blog/project content less time-sensitive once published
- On-demand revalidation available via Sanity webhooks (future enhancement)

**Alternative considered:**
- Static Site Generation only: Would miss content updates between deployments
- Server-Side Rendering: Would sacrifice performance for freshness
- Aggressive ISR (60s): Would increase server load unnecessarily

### Decision 4: Schema Design Approach

**Schemas defined in Sanity Studio (separate repo/config), not in Next.js app:**
- Keep content model separate from application code
- Sanity CLI provides better schema development experience
- Studio provides real-time schema validation

**Content model mapping:**
```
Current mock types → Sanity document types
- Homepage → homepage (singleton)
- Project[] → project (document)
- BlogPost[] → post (document)
```

**Why separate schema repo:**
- Sanity Studio can be deployed independently
- Schema changes don't require app deployment
- Better separation of concerns

**Alternative considered:**
- Embedded schemas in Next.js: Would couple content model to application deployment
- GROQ-based type generation: Would add build complexity

### Decision 5: Image Handling Strategy

**Use @sanity/image-url for all image transformations:**
- Automatic format selection (WebP, AVIF)
- Responsive image sizing on-the-fly
- CDN caching with global edge network
- Blur placeholder generation

**Integration with Next.js Image:**
- Custom loader pointing to Sanity CDN
- Maintain Next.js Image component usage for consistency
- Leverage both Sanity CDN and Next.js optimization

### Decision 6: Environment Configuration

**Required environment variables:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<project-id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<read-token>        # For draft mode
SANITY_REVALIDATE_SECRET=<secret>    # For webhook revalidation (future)
```

**Public vs private:**
- Project ID and dataset are public (safe for client-side)
- API token is server-only (for preview/draft access)
- Revalidate secret is server-only (for webhook security)

## Risks / Trade-offs

### Risk: Sanity Service Dependency
**Impact:** Application depends on Sanity's availability
**Mitigation:**
- Sanity has 99.9% uptime SLA
- ISR means stale content served if Sanity is down
- Consider adding error boundaries for graceful degradation

### Risk: API Rate Limits
**Impact:** Free tier has query limits that might be exceeded
**Mitigation:**
- ISR significantly reduces query frequency
- Monitor usage in Sanity dashboard
- Free tier allows 100k queries/month (sufficient for personal site)

### Trade-off: Additional Build Complexity
**Cost:** More dependencies, configuration, external service setup
**Benefit:** Professional content management without building custom CMS
**Decision:** Worth it for editorial flexibility and image optimization

### Trade-off: Initial Content Migration
**Cost:** Need to manually enter existing mock content into Sanity
**Benefit:** One-time effort, enables ongoing content management
**Decision:** Acceptable for 3 blog posts and 3 projects

### Risk: Schema Evolution
**Impact:** Changing Sanity schemas might break existing app code
**Mitigation:**
- Keep TypeScript interfaces as source of truth
- Map Sanity responses to existing interfaces in cms.ts
- Version Sanity schemas if breaking changes needed

## Migration Plan

### Phase 1: Sanity Setup (Parallel to Development)
1. Create Sanity project via Sanity CLI
2. Define schemas for homepage, post, project documents
3. Deploy Sanity Studio (use Sanity's hosted option)
4. Migrate mock data into Sanity manually

### Phase 2: Application Integration
1. Install dependencies (@sanity/client, next-sanity, @sanity/image-url)
2. Create Sanity client configuration
3. Update cms.ts functions to use Sanity client
4. Update types to include Sanity-specific metadata
5. Add environment variables

### Phase 3: Testing and Validation
1. Test all pages render correctly with Sanity data
2. Verify images load and optimize properly
3. Test draft/preview mode
4. Performance testing (Lighthouse scores)
5. Test ISR behavior

### Phase 4: Deployment
1. Set environment variables in deployment platform
2. Deploy to production
3. Verify content loads correctly
4. Monitor for errors

### Rollback Plan
If critical issues arise post-deployment:
1. Revert to previous deployment (mock data)
2. Debug integration issues in staging
3. Redeploy once fixed

**Note:** Since existing API surface is maintained, rollback is low-risk.

## Open Questions

1. **Should we set up Sanity webhooks for on-demand revalidation?**
   - Answer: Not in initial implementation. ISR with fixed intervals is sufficient. Can add webhooks as enhancement later.

2. **Do we need a local Sanity dataset for development?**
   - Answer: Yes, recommended. Use `development` dataset alongside `production`. Allows safe schema testing.

3. **Should we add content preview URLs for editors?**
   - Answer: Yes, add preview mode support. Critical for content review workflow.

4. **How should we handle deleted content in Sanity?**
   - Answer: Sanity documents have `_id`. If document not found, return null (existing behavior). Page will show 404.
