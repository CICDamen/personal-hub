# Personal Hub Documentation

Welcome to the Personal Hub documentation! This directory contains comprehensive guides for developing, deploying, and maintaining the application.

## 📚 Documentation Overview

### [ARCHITECTURE.md](./ARCHITECTURE.md)
**System Architecture & Design**

Complete architectural documentation including:
- System overview and component diagrams
- Data flow and caching strategy
- Technology stack decisions
- Performance optimization strategies
- Security architecture
- Scalability considerations

**Best for:** Understanding how the system works, making architectural decisions, onboarding new developers.

### [API.md](./API.md)
**API Reference & Type Definitions**

Comprehensive API documentation covering:
- All CMS functions with signatures and examples
- GROQ query reference
- Data transformation mappers
- Image optimization utilities
- TypeScript type definitions
- Error handling patterns

**Best for:** Implementing features, understanding data structures, debugging API issues.

### [DEPLOYMENT.md](./DEPLOYMENT.md)
**Deployment Guides**

Step-by-step deployment instructions for:
- Coolify deployment (recommended)
- Docker deployment (single container & Docker Compose)
- Kubernetes deployment
- Manual deployment with PM2/nginx
- SSL configuration
- Production checklist

**Best for:** Deploying to production, setting up CI/CD, managing infrastructure.

### [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
**Common Issues & Solutions**

Solutions for frequent problems:
- Build and runtime errors
- Sanity connection issues
- Image loading problems
- Docker troubleshooting
- Performance optimization
- Error code reference

**Best for:** Debugging issues, resolving deployment problems, performance tuning.

## 🚀 Quick Start Guides

### For Developers

1. **First Time Setup**
   - Read [ARCHITECTURE.md](./ARCHITECTURE.md#overview) for system understanding
   - Follow [README.md](../README.md#getting-started) for local setup
   - Review [API.md](./API.md#cms-functions) for data fetching

2. **Adding Features**
   - Check [ARCHITECTURE.md](./ARCHITECTURE.md#component-architecture) for structure
   - Use [API.md](./API.md) for CMS integration
   - Follow TypeScript types in [API.md](./API.md#type-definitions)

3. **Debugging**
   - Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) first
   - Review browser console and server logs
   - Test Sanity queries in Vision tool

### For DevOps/Deployment

1. **Docker Deployment**
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md#docker-deployment)
   - Configure environment variables
   - Use `docker-compose.yml` for quick start

2. **Production Setup**
   - Review [DEPLOYMENT.md](./DEPLOYMENT.md#production-checklist)
   - Configure SSL with Let's Encrypt
   - Set up monitoring and logging

3. **Troubleshooting Deployment**
   - Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#docker-issues)
   - Review container logs
   - Verify environment configuration

## 📁 File Structure

```
docs/
├── README.md              # This file - documentation overview
├── ARCHITECTURE.md        # System architecture and design
├── API.md                 # Complete API reference
├── DEPLOYMENT.md          # Deployment guides
└── TROUBLESHOOTING.md     # Common issues and solutions
```

## 🔗 Related Documentation

- **[Main README](../README.md)** - Project overview and quick start
- **[Studio README](../studio/README.md)** - Sanity Studio setup
- **[Sanity Schemas README](../sanity-schemas/README.md)** - Content schema documentation

## 🛠 Technology Stack Reference

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Package Manager:** Bun
- **Runtime:** Node.js 18+

### Backend/CMS
- **CMS:** Sanity.io
- **Query Language:** GROQ
- **Image CDN:** Sanity CDN
- **API:** Sanity Client v7

### Deployment
- **Platform:** Coolify (recommended)
- **Container:** Docker
- **Orchestration:** Docker Compose / Kubernetes
- **Web Server:** nginx (for Studio)

## 📊 Documentation Maintenance

### Updating Documentation

When making significant changes to the codebase:

1. **Update ARCHITECTURE.md** if:
   - Adding new components or services
   - Changing data flow
   - Modifying deployment architecture
   - Updating technology stack

2. **Update API.md** if:
   - Adding/modifying CMS functions
   - Changing type definitions
   - Adding new API routes
   - Updating GROQ queries

3. **Update DEPLOYMENT.md** if:
   - Changing deployment process
   - Adding new environment variables
   - Modifying Docker configuration
   - Adding deployment platforms

4. **Update TROUBLESHOOTING.md** if:
   - Discovering new common issues
   - Finding solutions to frequent problems
   - Adding error codes
   - Documenting debugging procedures

### Documentation Standards

- Use clear, concise language
- Include code examples
- Provide command-line examples
- Link between related sections
- Keep tables of contents updated
- Use diagrams where helpful (Mermaid)

## 🤝 Contributing

When contributing to documentation:

1. Follow the existing format and structure
2. Test all code examples
3. Verify all links work
4. Update table of contents
5. Add examples for complex concepts
6. Review grammar and spelling

## 📞 Support

If you can't find what you're looking for:

1. Search all documentation files
2. Check the main [README.md](../README.md)
3. Review [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
4. Check external resources:
   - [Next.js Documentation](https://nextjs.org/docs)
   - [Sanity Documentation](https://www.sanity.io/docs)
   - [Docker Documentation](https://docs.docker.com)

## 📝 Documentation Checklist

### For New Features
- [ ] Update API.md with new functions
- [ ] Add type definitions
- [ ] Include usage examples
- [ ] Update architecture diagrams if needed
- [ ] Add troubleshooting notes for common issues

### For Deployment Changes
- [ ] Update DEPLOYMENT.md with new steps
- [ ] Test deployment process
- [ ] Document environment variables
- [ ] Add rollback procedures
- [ ] Update production checklist

### For Bug Fixes
- [ ] Add issue to TROUBLESHOOTING.md
- [ ] Document solution
- [ ] Include prevention steps
- [ ] Add to error code reference

---

**Last Updated:** January 2026
**Documentation Version:** 1.0.0
**Application Version:** 1.0.0
