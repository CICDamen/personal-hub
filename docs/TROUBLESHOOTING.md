# Troubleshooting Guide

Common issues and solutions for Personal Hub deployment and development.

## Table of Contents

- [Build Issues](#build-issues)
- [Runtime Errors](#runtime-errors)
- [Sanity Connection Issues](#sanity-connection-issues)
- [Image Loading Problems](#image-loading-problems)
- [Docker Issues](#docker-issues)
- [Performance Problems](#performance-problems)

## Build Issues

### Error: Cannot find module '@sanity/client'

**Problem:** Sanity dependencies not installed.

**Solution:**
```bash
bun install
```

### Error: 'output' is not a valid Next.js configuration

**Problem:** Using older Next.js version.

**Solution:** Update Next.js:
```bash
bun update next@latest
```

### TypeScript errors in Sanity files

**Problem:** Missing type definitions.

**Solution:**
```bash
bun install -D @types/node @types/react @types/react-dom
```

### Build fails with "Configuration must contain `projectId`"

**Problem:** Environment variables not loaded during build.

**Solution:**
```bash
# Verify .env.local exists and contains:
NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## Runtime Errors

### Error: "Homepage document not found in Sanity"

**Problem:** No homepage document in Sanity.

**Solution:**
1. Open Sanity Studio
2. Create a homepage document
3. Fill all required fields
4. Click "Publish"

### Error: "Failed to fetch" or network errors

**Problem:** Sanity API not accessible.

**Solution:**
1. Check internet connection
2. Verify Sanity project ID is correct
3. Check Sanity service status: https://status.sanity.io
4. Verify CORS settings in Sanity project

### 404 on blog post or project pages

**Problem:** Slug doesn't exist or ISR cache outdated.

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
bun run build
bun run start
```

### Images not displaying

**Problem:** Image URLs not generated correctly.

**Solution:**
1. Verify images uploaded in Sanity Studio
2. Check `next.config.ts` allows `cdn.sanity.io`:
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
    },
  ],
}
```

## Sanity Connection Issues

### Error: "Invalid token"

**Problem:** Sanity API token invalid or expired.

**Solution:**
1. Go to https://sanity.io/manage
2. Navigate to API → Tokens
3. Generate new token with "Read" permissions
4. Update `SANITY_API_TOKEN` in `.env.local`

### Preview mode not working

**Problem:** Draft mode not enabled or secret invalid.

**Solution:**
1. Verify `SANITY_REVALIDATE_SECRET` matches in:
   - `.env.local`
   - Preview URL: `?secret=YOUR_SECRET`
2. Check API token has read permissions
3. Verify draft content exists in Sanity

### GROQ query errors

**Problem:** Invalid query syntax.

**Solution:**
1. Test query in Sanity Studio Vision tool
2. Check field names match schema
3. Verify projection syntax

**Example:**
```groq
// Correct
*[_type == "post"][0] {
  title,
  "slug": slug.current
}

// Incorrect (missing .current)
*[_type == "post"][0] {
  title,
  slug
}
```

## Image Loading Problems

### Images load slowly

**Problem:** Not using Sanity CDN optimizations.

**Solution:**
Use `getImageUrl` with proper width:
```typescript
import { getImageUrl } from '@/lib/sanity/image'

const url = getImageUrl(image, 800, 80) // width, quality
```

### Images broken or 404

**Problem:** Invalid image reference.

**Solution:**
1. Verify image uploaded in Sanity
2. Check image field is not empty
3. Verify image reference format:
```typescript
{
  asset: {
    _ref: "image-abc123-1200x800-jpg"
  },
  alt: "Description"
}
```

### Next.js Image component errors

**Problem:** Missing required props or invalid src.

**Solution:**
```typescript
import Image from 'next/image'

<Image
  src={imageUrl}
  alt={image.alt || 'Default alt text'}
  width={800}
  height={600}
  loading="lazy"
/>
```

## Docker Issues

### Container won't start

**Problem:** Port already in use.

**Solution:**
```bash
# Check what's using port 3000
lsof -ti:3000

# Kill process
kill -9 $(lsof -ti:3000)

# Or change port in docker-compose.yml
ports:
  - "3001:3000"  # Use port 3001 instead
```

### Build fails in Docker

**Problem:** Dependencies or build errors.

**Solution:**
```bash
# Build with no cache
docker-compose build --no-cache

# Check build logs
docker-compose logs app
```

### Environment variables not loaded

**Problem:** `.env.local` not mounted or `env_file` not configured.

**Solution:**
Verify `docker-compose.yml`:
```yaml
services:
  app:
    env_file:
      - .env.local
    environment:
      - NEXT_PUBLIC_SANITY_PROJECT_ID=${NEXT_PUBLIC_SANITY_PROJECT_ID}
```

### Permission errors in container

**Problem:** Running as root or wrong user.

**Solution:**
```dockerfile
# In Dockerfile
RUN chown -R nextjs:nodejs /app
USER nextjs
```

### Health check failing

**Problem:** Application not responding.

**Solution:**
```bash
# Check container logs
docker logs personal-hub-app

# Enter container
docker exec -it personal-hub-app sh

# Test endpoint
wget http://localhost:3000
```

## Performance Problems

### Slow page loads

**Problem:** ISR not configured or Sanity queries inefficient.

**Solution:**
1. Add revalidation to pages:
```typescript
export const revalidate = 3600 // 1 hour
```

2. Optimize GROQ queries (only fetch needed fields)
3. Use CDN for images
4. Enable Next.js compression

### High memory usage

**Problem:** Too many images or large bundles.

**Solution:**
1. Implement lazy loading
2. Use proper image sizes
3. Check for memory leaks in components
4. Limit bundle size with dynamic imports

### ISR not updating content

**Problem:** Cache not revalidating.

**Solution:**
```bash
# Force revalidation by visiting:
https://your-site.com/api/revalidate?secret=YOUR_SECRET&path=/blog
```

Or clear `.next` cache:
```bash
rm -rf .next
bun run build
```

## Common Command Reference

### Development

```bash
# Clear cache and rebuild
rm -rf .next node_modules bun.lock
bun install
bun run dev

# Check for TypeScript errors
bun run type-check

# Lint code
bun run lint
```

### Docker

```bash
# View all logs
docker-compose logs -f

# Restart specific service
docker-compose restart app

# Rebuild and restart
docker-compose up -d --build

# Clean everything
docker-compose down -v
docker system prune -a
```

### Sanity

```bash
# Test Sanity connection
curl "https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=*[_type=='homepage'][0]"

# Deploy Sanity Studio
cd studio
bun run deploy
```

## Getting Help

If issues persist:

1. **Check logs:**
   - Browser console (F12)
   - Next.js terminal output
   - Docker logs: `docker-compose logs`

2. **Verify configuration:**
   - Environment variables set correctly
   - Sanity project accessible
   - Network connectivity

3. **Test components:**
   - Sanity Studio loads
   - API routes respond
   - Images serve correctly

4. **Resources:**
   - Next.js Docs: https://nextjs.org/docs
   - Sanity Docs: https://www.sanity.io/docs
   - GitHub Issues: Report bugs to your repository

5. **Debug mode:**
```bash
# Enable verbose logging
NODE_DEBUG=* bun run dev

# Or with Docker
docker-compose --verbose up
```

## Prevention

### Before Deploying

- [ ] All environment variables configured
- [ ] Sanity content exists and is published
- [ ] Build succeeds locally
- [ ] Tests pass
- [ ] Images load correctly
- [ ] Performance acceptable
- [ ] Security audit completed

### Regular Maintenance

- [ ] Update dependencies monthly
- [ ] Monitor Sanity API usage
- [ ] Check error logs weekly
- [ ] Review performance metrics
- [ ] Backup Sanity content (export datasets)
- [ ] Test draft mode functionality
- [ ] Verify ISR cache behavior

## Error Code Reference

| Code | Meaning | Solution |
|------|---------|----------|
| ECONNREFUSED | Can't connect to Sanity | Check network, verify project ID |
| ENOTFOUND | DNS resolution failed | Check internet connection |
| 401 | Unauthorized | Verify API token |
| 404 | Content not found | Check Sanity, verify slug |
| 409 | Conflict | Document reference error, check schemas |
| 500 | Server error | Check application logs |

---

For issues not covered here, check the [Architecture](./ARCHITECTURE.md) and [API](./API.md) documentation for system-specific details.
