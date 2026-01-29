# Personal Hub - Sanity Studio

This is the Sanity Studio for managing content in the Personal Hub application.

## Features

- **Programmatic Schema Loading**: Schemas are automatically imported from `../sanity-schemas/`
- **Singleton Homepage**: Only one homepage document can exist
- **Organized Structure**: Clean sidebar with Homepage at the top, then Blog Posts and Projects
- **Vision Tool**: Built-in GROQ query testing tool

## Setup

### 1. Install Dependencies

From the `studio/` directory:

```bash
cd studio
bun install
```

Or from the root of personal-hub:

```bash
cd studio && bun install && cd ..
```

### 2. Configure Environment Variables

Create `.env` file in the `studio/` directory:

```bash
cp .env.example .env
```

Edit `.env`:
```
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

**Finding your Project ID:**
1. Go to https://www.sanity.io/manage
2. Select your project
3. Copy the Project ID from settings

### 3. Run the Studio Locally

```bash
bun run dev
```

The studio will be available at http://localhost:3333

### 4. Deploy to Sanity's Hosted Studio (Optional)

```bash
bun run deploy
```

This will deploy your studio to `https://your-project.sanity.studio`

## Usage

### Creating Content

**Homepage (Singleton):**
1. Click "Homepage" in the sidebar
2. Fill in all required fields
3. Upload your headshot image
4. Click "Publish"

**Blog Posts:**
1. Click "Blog Posts" in the sidebar
2. Click "Create" button
3. Fill in title, content, etc.
4. Generate slug from title
5. Upload thumbnail image
6. Click "Publish"

**Projects:**
1. Click "Projects" in the sidebar
2. Click "Create" button
3. Fill in project details
4. Check "Featured Project" if it should appear on homepage
5. Upload images
6. Click "Publish"

### Testing Queries

Use the **Vision** tool (last icon in sidebar) to test GROQ queries:

```groq
// Test homepage query
*[_type == "homepage"][0]

// Test blog posts
*[_type == "post"] | order(publishedDate desc)

// Test featured projects
*[_type == "project" && featured == true]
```

### Content Preview in Next.js App

To preview unpublished content:

1. Enable draft mode in your Next.js app:
   ```
   http://localhost:3000/api/draft?secret=YOUR_SECRET&slug=/blog/post-slug
   ```

2. Configure this URL in Sanity Studio for the "Open Preview" button (coming soon)

## Project Structure

```
studio/
├── sanity.config.ts    # Main Studio configuration
├── sanity.cli.ts       # CLI configuration
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── .env                # Environment variables (gitignored)
└── README.md           # This file

../sanity-schemas/      # Schema definitions (shared)
├── homepage.ts
├── post.ts
└── project.ts
```

## Benefits of This Setup

1. **Single Source of Truth**: Schemas in `sanity-schemas/` are used by both the Next.js app and Studio
2. **No Manual Copying**: Changes to schemas automatically reflect in Studio
3. **Type Safety**: TypeScript ensures schemas are valid
4. **Version Control**: Everything is in the same repo
5. **Easy Updates**: Update schemas once, both apps benefit

## Troubleshooting

### "Module not found" errors
- Ensure you're in the `studio/` directory when running commands
- Check that `node_modules` is installed: `bun install`

### Studio won't start
- Verify your `.env` file has correct project ID and dataset
- Check that your Sanity project exists at https://www.sanity.io/manage

### Schemas not loading
- Check that paths in `sanity.config.ts` correctly point to `../sanity-schemas/`
- Ensure schema files exist and are valid TypeScript

### Can't publish documents
- Verify you have write permissions in your Sanity project
- Check that all required fields are filled

## Commands Reference

```bash
bun run dev      # Start development server (localhost:3333)
bun run build    # Build studio for production
bun run deploy   # Deploy to Sanity's hosted studio
```

## Next Steps

1. Install dependencies: `bun install`
2. Configure environment: `cp .env.example .env` and fill in values
3. Run studio: `bun run dev`
4. Create content
5. Verify content appears in Next.js app (with environment variables set)

## Support

- Sanity Documentation: https://www.sanity.io/docs
- Vision Tool Guide: https://www.sanity.io/docs/the-vision-plugin
- GROQ Reference: https://www.sanity.io/docs/groq
