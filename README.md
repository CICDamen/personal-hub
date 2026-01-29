# Personal Hub

A professional web application showcasing career achievements, expertise, blog posts, and client projects.

## Features

- **Hero Section**: Professional headshot, name, title, tagline, social links (GitHub, LinkedIn), and contact information
- **About Section**: Professional background and expertise summary
- **Featured Projects**: Showcase of client projects with detailed case studies
- **Blog**: Technical articles and insights with full-text content
- **Content Management**: Integrated with Sanity CMS for easy content editing
- **Draft Mode**: Preview unpublished content before publishing
- **ISR (Incremental Static Regeneration)**: Fresh content with optimal performance
- **Responsive Design**: Mobile-first design that works on all devices
- **SEO Optimized**: Complete metadata including Open Graph and Twitter Cards
- **Accessible**: WCAG 2.1 AA compliant with semantic HTML and keyboard navigation
- **Image Optimization**: Sanity CDN with automatic format selection (WebP, AVIF)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: bun
- **CMS**: Sanity.io
- **Image Optimization**: Sanity CDN + Next.js Image component

## Getting Started

### Prerequisites

- Bun runtime (https://bun.sh/) OR Docker
- Sanity account and project (see [Sanity Setup](#sanity-cms-setup))

### Quick Start Options

#### Option 1: Docker (Recommended)

Running with Docker provides an isolated, production-like environment.

**Prerequisites:**
- Docker 20.10+ ([Install Docker](https://docs.docker.com/get-docker/))
- Docker Compose 2.0+ (included with Docker Desktop)

**Quick Start:**

1. Clone and configure environment:
```bash
git clone https://github.com/your-username/personal-hub.git
cd personal-hub
cp .env.local.example .env.local
# Edit .env.local with your Sanity credentials
```

2. Start services:
```bash
docker-compose up -d
```

3. Access the application:
- **Application**: http://localhost:3000
- **Studio**: http://localhost:3333

**Common Commands:**
```bash
docker-compose logs -f        # View logs
docker-compose restart        # Restart services
docker-compose down           # Stop and remove containers
docker-compose up -d --build  # Rebuild after code changes
```

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed Docker instructions and production deployment.

#### Option 2: Local Development

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/personal-hub.git
cd personal-hub
bun install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Sanity credentials:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token
SANITY_REVALIDATE_SECRET=your_random_secret
```

3. Run the development server:
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the homepage.

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   │   ├── draft/    # Draft mode enable
│   │   │   └── disable-draft/ # Draft mode disable
│   │   ├── blog/         # Blog pages
│   │   │   ├── [slug]/   # Individual blog post
│   │   │   └── page.tsx  # Blog listing
│   │   ├── projects/     # Project pages
│   │   │   ├── [slug]/   # Individual project
│   │   │   └── page.tsx  # Project listing
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── RecentBlogPosts.tsx
│   │   └── BlogPostCard.tsx
│   ├── lib/              # Utilities
│   │   ├── cms.ts        # CMS data fetching functions
│   │   └── sanity/       # Sanity integration
│   │       ├── client.ts # Sanity client config
│   │       ├── image.ts  # Image URL builder
│   │       ├── queries.ts # GROQ queries
│   │       └── mappers.ts # Data mappers
│   └── types/            # TypeScript types
│       └── cms.ts        # CMS data models
├── sanity-schemas/       # Sanity schema definitions
│   ├── homepage.ts
│   ├── post.ts
│   └── project.ts
├── public/               # Static assets
└── openspec/             # OpenSpec documentation
```

## Sanity CMS Setup

This application uses Sanity.io for content management with a built-in Studio.

### Quick Setup

1. **Set up Sanity Studio:**
```bash
cd studio
bun install
cp .env.example .env
# Edit .env with your SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET
bun run dev  # Runs at http://localhost:3333
```

2. **Configure application environment:**
```bash
cp .env.local.example .env.local
# Edit .env.local with your Sanity credentials
```

Required credentials:
- **Project ID**: From Sanity project settings
- **API Token**: Generate in Sanity project settings → API → Tokens (Read permissions)
- **Revalidate Secret**: Random string for webhook security

### Content Management

Create these document types in your Sanity Studio:
- **Homepage**: Personal information, headshot, bio, links
- **Posts**: Blog articles with content and images
- **Projects**: Portfolio pieces with case studies

### Draft Preview

Preview unpublished content:
```
https://your-site.com/api/draft?secret=YOUR_SECRET&slug=/blog/post-slug
```

See [Studio README](./studio/README.md) for detailed documentation.

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture, component design, data flow, and technology decisions
- **[API.md](./docs/API.md)** - Complete API reference for CMS functions, GROQ queries, and data types
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Deployment guides for Coolify, Docker, and manual deployment
- **[Studio README](./studio/README.md)** - Sanity Studio setup and usage guide

### Quick Links

- [Architecture Diagrams](./docs/ARCHITECTURE.md#architecture-diagram)
- [CMS API Functions](./docs/API.md#cms-functions)
- [Coolify Deployment](./docs/DEPLOYMENT.md#coolify-deployment-recommended)
- [Docker Deployment](./docs/DEPLOYMENT.md#docker-deployment)
- [Performance Strategy](./docs/ARCHITECTURE.md#performance-strategy)

Exit draft mode: `https://your-site.com/api/disable-draft`

## Deployment

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for complete deployment guides covering:
- **Coolify** (recommended) - One-click Docker Compose deployment with automatic HTTPS
- **Docker** - Manual Docker and Docker Compose deployment
- **Manual** - Traditional deployment with Node.js/Bun and nginx

## Development

```bash
bun run dev     # Development mode with hot reload
bun run lint    # Type checking
bun run build   # Build for production
bun start       # Start production server
```

**Key directories:**
- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - React components
- `src/lib/sanity/` - Sanity client, queries, and data mappers
- `sanity-schemas/` - Sanity schema definitions

## Content Updates

Content is automatically refreshed using ISR (Incremental Static Regeneration):
- **Homepage**: Every 30 minutes
- **Blog posts**: Every 1 hour
- **Projects**: Every 1 hour

For immediate updates, set up Sanity webhooks or redeploy the application.

## Troubleshooting

**Content not showing:**
- Verify environment variables are set
- Check content exists in Sanity Studio with all required fields
- Check browser console for errors

**Images not loading:**
- Verify images are uploaded to Sanity with alt text
- Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` is set

**Build errors:**
- Run `bun run lint` to check for TypeScript errors
- Verify all environment variables
- Delete `.next` folder and rebuild

For detailed troubleshooting, see [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)

## Additional Resources

- **OpenSpec**: Change management documentation in `openspec/` directory
- **Schema Documentation**: See `sanity-schemas/README.md`
- **Troubleshooting**: See [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)

## License

Private - All rights reserved
