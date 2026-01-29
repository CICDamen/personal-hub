# Sanity Studio Dockerfile - Production Build
# Multi-stage build: builder + static file server

# Stage 1: Builder
FROM oven/bun:1 AS builder
WORKDIR /app

# Copy schemas (for ../sanity-schemas imports)
COPY sanity-schemas ./sanity-schemas

# Copy studio source
COPY studio/ ./studio/

WORKDIR /app/studio

# Install dependencies
RUN bun install --frozen-lockfile

# Build-time environment variables (baked into the bundle)
ARG SANITY_STUDIO_PROJECT_ID
ARG SANITY_STUDIO_DATASET
ENV SANITY_STUDIO_PROJECT_ID=$SANITY_STUDIO_PROJECT_ID
ENV SANITY_STUDIO_DATASET=$SANITY_STUDIO_DATASET
ENV SANITY_CLI_TELEMETRY_DISABLED=1

# Build static files
RUN bun run build

# Stage 2: Production server
FROM oven/bun:1-slim
WORKDIR /app

# Install serve for static file serving
RUN apt-get update && \
    apt-get install -y wget && \
    rm -rf /var/lib/apt/lists/* && \
    bun add -g serve

# Copy built files from builder
COPY --from=builder /app/studio/dist ./dist

# Expose port
EXPOSE 3333

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3333/ || exit 1

# Serve static files with proper SPA routing
CMD ["serve", "dist", "-l", "3333", "--no-clipboard", "--single"]
