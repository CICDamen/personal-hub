# Sanity Schema Definitions

This directory contains schema definitions for the personal-hub Sanity Studio.

## Files

- `homepage.ts` - Homepage singleton document schema
- `post.ts` - Blog post document schema
- `project.ts` - Project document schema

## How to Use These Schemas in Sanity Studio

### Option 1: Add to Existing Sanity Studio

If you already have a Sanity Studio configured:

1. Copy these files to your Sanity Studio's `schemas` directory
2. Import them in your `sanity.config.ts` or `schema.ts`:

```typescript
import homepage from './schemas/homepage'
import post from './schemas/post'
import project from './schemas/project'

export const schemaTypes = [homepage, post, project]
```

3. Deploy the schema changes:
```bash
cd /path/to/your/sanity-studio
sanity deploy
```

### Option 2: Create a New Sanity Studio

If you don't have a Sanity Studio set up yet:

1. Create a new Sanity Studio in a separate directory:
```bash
npm create sanity@latest
```

2. Follow the prompts:
   - Select your existing project
   - Choose "Clean project with no predefined schemas"
   - Choose your preferred template structure

3. Copy these schema files to the `schemas` directory in your new Studio

4. Update the schema configuration to include these types

5. Run the Studio locally to test:
```bash
npm run dev
```

6. Deploy to Sanity's hosted Studio:
```bash
sanity deploy
```

## Schema Details

### Homepage (Singleton)

Only one homepage document should exist. In Sanity Studio, you'll need to configure this as a singleton by adding this to your desk structure:

```typescript
S.listItem()
  .title('Homepage')
  .child(
    S.document()
      .schemaType('homepage')
      .documentId('homepage')
  )
```

### Post Documents

Blog posts with:
- Title, slug (auto-generated from title)
- Excerpt and full content
- Thumbnail image with alt text
- Author, published date, reading time
- Automatic preview with author and date

### Project Documents

Projects with:
- Title, slug, description
- Thumbnail and additional project images
- Featured flag for homepage display
- Technologies array (tags)
- Content, challenge, solution sections
- Outcomes array
- Completion date (YYYY-MM format)
- Optional client name and project link
- Automatic preview showing featured status

## Next Steps

After deploying these schemas to your Sanity Studio:

1. Access your Sanity Studio at `https://your-project.sanity.studio/` or run locally
2. Create a homepage document
3. Add blog posts and projects
4. Once content is added, update the Next.js app environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN` (for draft mode)
