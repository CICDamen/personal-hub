# Project Context

## Purpose
Personal-hub is a professional web application showcasing career achievements and expertise. The platform serves as a digital portfolio and knowledge base containing:
- Blog articles on professional topics
- Work experience and career timeline
- Client case studies and project highlights
- Professional insights and thought leadership content

**Goals:**
- Present a polished, professional online presence
- Share knowledge and expertise through blog content
- Showcase real-world client work and project outcomes
- Maintain a centralized hub for professional content

## Tech Stack

### Frontend
- **Framework:** Next.js (React-based with SSR/SSG)
- **Language:** TypeScript
- **UI Library:** React
- **Styling:** TBD (Tailwind CSS / CSS Modules / Styled Components)

### Backend / Data
- **Content Management:** Headless CMS (Contentful or Sanity)
- **API:** Next.js API Routes / Server Components
- **Runtime:** Node.js

### Development Tools
- **Package Manager:** npm / yarn / pnpm
- **Type Checking:** TypeScript compiler
- **Linting:** ESLint
- **Formatting:** Prettier

## Project Conventions

### Code Style
- **Language:** TypeScript for all code (strict mode enabled)
- **Naming Conventions:**
  - Components: PascalCase (e.g., `BlogPost.tsx`, `WorkExperience.tsx`)
  - Functions/variables: camelCase (e.g., `fetchBlogPosts`, `userProfile`)
  - Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_POSTS_PER_PAGE`)
  - Files: kebab-case for utilities, PascalCase for components
- **Formatting:** Prettier with default settings
- **Import Order:** External dependencies → Internal modules → Relative imports
- **File Organization:** Feature-based or domain-based directory structure

### Architecture Patterns
- **Modular Architecture:** Separate modules for blog, work experience, case studies, etc.
- **API-First Design:** Clear separation between frontend and content layer via CMS APIs
- **Component Composition:** Reusable, composable React components
- **Server-Side Rendering:** Leverage Next.js SSG/SSR for performance and SEO
- **Separation of Concerns:** Business logic separated from presentation components
- **Type Safety:** Strong TypeScript types throughout the application

### Testing Strategy
- **Unit Tests:** Jest or Vitest for testing individual components and utility functions
  - Test component logic and utility functions in isolation
  - Aim for high coverage on business logic
- **Integration Tests:** Test interactions between components and API calls
  - Verify data fetching and state management
  - Test component integration with context/stores
- **E2E Tests:** Playwright or Cypress for critical user flows
  - Blog post viewing and navigation
  - Content search and filtering
  - Responsive behavior across devices
- **Test Coverage Goals:** Maintain >80% coverage for critical paths

### Git Workflow
- **Branch Strategy:** Git Flow or GitHub Flow
  - `main` - production-ready code
  - `develop` - integration branch for features
  - `feature/*` - individual feature branches
  - `fix/*` - bug fix branches
- **Commit Conventions:** Conventional Commits format
  - `feat:` - new features
  - `fix:` - bug fixes
  - `docs:` - documentation changes
  - `refactor:` - code refactoring
  - `test:` - adding/updating tests
  - `chore:` - maintenance tasks
- **PR Requirements:** Code review required before merging to main/develop

## Domain Context

### Content Types
- **Blog Posts:** Technical articles, tutorials, professional insights
- **Work Experience:** Career timeline with roles, companies, and achievements
- **Case Studies:** Detailed client project breakdowns with challenges and solutions
- **About/Bio:** Professional background and expertise areas

### User Personas
- **Recruiters:** Looking to assess technical skills and experience
- **Potential Clients:** Evaluating expertise through case studies and blog content
- **Peers/Community:** Reading blog content and learning from shared experiences

### Content Management
- Content is managed in a headless CMS (Contentful/Sanity)
- Editors can create/update content without code deployments
- Content is fetched via CMS API at build time or on-demand
- Support for draft previews and scheduled publishing

## Important Constraints

### Performance
- Target Lighthouse score >90 for all metrics
- First Contentful Paint <1.5s
- Time to Interactive <3s
- Optimize images and assets for web delivery

### SEO Requirements
- Server-side rendering for search engine crawlability
- Proper meta tags and Open Graph data
- Semantic HTML and structured data (JSON-LD)
- Sitemap generation for content pages

### Accessibility
- WCAG 2.1 AA compliance minimum
- Semantic HTML elements
- Keyboard navigation support
- Screen reader compatibility

### Security
- No sensitive data stored client-side
- Secure API key management (environment variables)
- Content Security Policy headers
- Regular dependency updates for security patches

## External Dependencies

### Content Management System
- **Contentful** or **Sanity** - Headless CMS for content storage and management
- API for fetching blog posts, case studies, work experience
- Webhook support for content updates

### Hosting & Deployment
- **Coolify** with Docker containers (recommended)
- Automated deployments from git branches
- Multi-container architecture (app + studio)
- Self-hosted with full control

### Analytics (Optional)
- Google Analytics or Plausible for traffic insights
- Privacy-focused analytics preferred

### Development Services
- **GitHub** - Version control and CI/CD
- **TypeScript** - Type checking and developer experience
- **npm Registry** - Package dependencies
