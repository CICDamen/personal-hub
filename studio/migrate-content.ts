/**
 * Content Migration Script
 *
 * This script creates placeholder content in Sanity CMS for:
 * - Homepage (singleton)
 * - Blog posts (3 posts)
 * - Projects (3 projects)
 *
 * Run with: npx tsx migrate-content.ts
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: false,
})

async function migrateContent() {
  console.log('🚀 Starting content migration...\n')

  try {
    // First, create a simple placeholder image from base64
    console.log('📝 Creating placeholder image...')
    // 1x1 blue pixel PNG
    const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    const imageBuffer = Buffer.from(base64Image, 'base64')
    const uploadedImage = await client.assets.upload('image', imageBuffer, {
      filename: 'placeholder.png',
      contentType: 'image/png',
    })
    console.log('✅ Placeholder image created\n')

    // Create Homepage
    console.log('📝 Creating homepage...')
    console.log('⚠️  Note: Replace placeholder images in Sanity Studio with real ones\n')

    await client.createOrReplace({
      _id: 'homepage',
      _type: 'homepage',
      name: 'Casper Alexander Damen',
      title: 'Full-Stack Developer & Technical Architect',
      tagline: 'Building elegant solutions to complex problems',
      headshot: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImage._id,
        },
        alt: 'Professional headshot of Casper Alexander Damen',
      },
      bio: 'Passionate about creating scalable web applications and solving challenging technical problems. Experienced in modern JavaScript frameworks, cloud architecture, and agile development practices.',
      socialLinks: {
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
      },
      contact: {
        email: 'your.email@example.com',
        location: 'Amsterdam, Netherlands',
      },
    })
    console.log('✅ Homepage created\n')

    // Create Blog Posts
    console.log('📝 Creating blog posts...')

    const blogPosts = [
      {
        _type: 'post',
        title: 'Building Scalable Web Applications with Next.js',
        slug: {
          current: 'building-scalable-web-applications-nextjs',
        },
        excerpt: 'Learn how to leverage Next.js features to build performant and scalable web applications that can handle millions of users.',
        thumbnail: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImage._id,
          },
          alt: 'Next.js application architecture diagram',
        },
        author: 'Casper Alexander Damen',
        publishedDate: '2024-12-15',
        readingTime: 8,
        content: `Next.js has become one of the most popular React frameworks for building production-ready applications. In this post, we'll explore key features that enable scalability.

## Server-Side Rendering

Server-side rendering (SSR) provides better performance and SEO. Next.js makes SSR straightforward with its App Router and server components.

## Static Site Generation

For content that doesn't change frequently, static site generation (SSG) provides the best performance. We can use incremental static regeneration (ISR) to keep content fresh.

## API Routes

Next.js API routes allow you to build a full-stack application within a single codebase, simplifying deployment and reducing latency.

## Conclusion

By leveraging these features, you can build applications that scale to millions of users while maintaining excellent performance and developer experience.`,
      },
      {
        _type: 'post',
        title: 'Mastering TypeScript: Advanced Patterns and Best Practices',
        slug: {
          current: 'mastering-typescript-advanced-patterns',
        },
        excerpt: 'Dive deep into advanced TypeScript patterns that will help you write more maintainable and type-safe code.',
        thumbnail: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImage._id,
          },
          alt: 'TypeScript code on a screen',
        },
        author: 'Casper Alexander Damen',
        publishedDate: '2024-11-28',
        readingTime: 12,
        content: `TypeScript has revolutionized JavaScript development by adding static typing. Let's explore advanced patterns that take your TypeScript skills to the next level.

## Conditional Types

Conditional types allow you to create types that depend on other types, enabling powerful type transformations.

## Mapped Types

Mapped types let you transform existing types into new types, making it easy to create variations of your data structures.

## Type Guards

Custom type guards help TypeScript narrow types, providing better type inference and safety in your code.

## Generic Constraints

Using generic constraints effectively can make your functions and classes more flexible while maintaining type safety.

## Conclusion

These advanced patterns will help you build more robust applications with better type safety and developer experience.`,
      },
      {
        _type: 'post',
        title: 'Optimizing React Performance: A Comprehensive Guide',
        slug: {
          current: 'optimizing-react-performance-guide',
        },
        excerpt: 'Discover proven techniques to optimize React applications and deliver lightning-fast user experiences.',
        thumbnail: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImage._id,
          },
          alt: 'React performance metrics dashboard',
        },
        author: 'Casper Alexander Damen',
        publishedDate: '2024-10-20',
        readingTime: 10,
        content: `React performance optimization is crucial for delivering great user experiences. This guide covers essential techniques to make your React apps blazing fast.

## Memoization

Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders and expensive computations.

## Code Splitting

Implement dynamic imports and React.lazy to reduce initial bundle size and improve load times.

## Virtual Lists

For long lists, use virtualization libraries like react-window to render only visible items.

## Profiler API

Use React's Profiler API to identify performance bottlenecks and measure the impact of your optimizations.

## Conclusion

By applying these techniques strategically, you can significantly improve your React application's performance and user experience.`,
      },
    ]

    for (const post of blogPosts) {
      await client.create(post)
      console.log(`✅ Created blog post: "${post.title}"`)
    }
    console.log()

    // Create Projects
    console.log('📝 Creating projects...')

    const projects = [
      {
        _type: 'project',
        title: 'E-Commerce Platform Redesign',
        slug: {
          current: 'ecommerce-platform-redesign',
        },
        description: 'Complete redesign and modernization of a legacy e-commerce platform serving 100K+ monthly active users.',
        thumbnail: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImage._id,
          },
          alt: 'E-commerce platform interface',
        },
        featured: true,
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
        link: 'https://example.com',
        content: 'Led the complete redesign of a legacy e-commerce platform, modernizing the tech stack and improving user experience. Implemented server-side rendering for better SEO and performance.',
        challenge: 'The existing platform was built on outdated technology, had poor performance, and was difficult to maintain. The main challenge was migrating years of legacy data while keeping the platform operational.',
        solution: 'Adopted a phased migration approach using Next.js and TypeScript. Built a new frontend while gradually migrating backend services. Implemented feature flags to safely roll out changes.',
        outcomes: [
          '40% improvement in page load times',
          '25% increase in conversion rate',
          '60% reduction in bounce rate',
          'Reduced technical debt and improved developer productivity',
        ],
        images: [
          {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: uploadedImage._id,
            },
            alt: 'Project screenshot 1',
          },
        ],
        completionDate: '2024-09',
        clientName: 'RetailCo',
      },
      {
        _type: 'project',
        title: 'Real-Time Analytics Dashboard',
        slug: {
          current: 'realtime-analytics-dashboard',
        },
        description: 'Built a real-time analytics dashboard for monitoring business metrics and user behavior across multiple platforms.',
        thumbnail: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImage._id,
          },
          alt: 'Analytics dashboard interface',
        },
        featured: true,
        technologies: ['React', 'TypeScript', 'WebSocket', 'D3.js', 'Redis', 'Node.js'],
        content: 'Developed a comprehensive analytics dashboard that provides real-time insights into business metrics. The system processes millions of events daily and presents data through interactive visualizations.',
        challenge: 'Processing and visualizing large volumes of real-time data while maintaining sub-second latency and ensuring data accuracy.',
        solution: 'Implemented a streaming architecture using WebSockets for real-time updates, with Redis for caching and aggregation. Used D3.js for custom visualizations optimized for performance.',
        outcomes: [
          'Processing 5M+ events per day in real-time',
          'Sub-second latency for dashboard updates',
          'Enabled data-driven decision making across the organization',
          '99.9% uptime achieved',
        ],
        images: [
          {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: uploadedImage._id,
            },
            alt: 'Project screenshot 2',
          },
        ],
        completionDate: '2024-06',
        clientName: 'TechAnalytics Inc',
      },
      {
        _type: 'project',
        title: 'Mobile Banking Application',
        slug: {
          current: 'mobile-banking-application',
        },
        description: 'Designed and developed a secure mobile banking application for iOS and Android with advanced security features.',
        thumbnail: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImage._id,
          },
          alt: 'Mobile banking app interface',
        },
        featured: false,
        technologies: ['React Native', 'TypeScript', 'GraphQL', 'AWS', 'Biometric Auth'],
        content: 'Built a cross-platform mobile banking application with a focus on security and user experience. Implemented biometric authentication, real-time notifications, and seamless payment processing.',
        challenge: 'Building a secure banking application that works reliably across both iOS and Android while maintaining strict compliance with financial regulations.',
        solution: 'Used React Native for cross-platform development with platform-specific security modules. Implemented end-to-end encryption, biometric authentication, and comprehensive audit logging.',
        outcomes: [
          '50K+ downloads in first quarter',
          '4.8/5 average user rating',
          'Zero security incidents since launch',
          'Reduced customer support calls by 30%',
        ],
        images: [
          {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: uploadedImage._id,
            },
            alt: 'Project screenshot 3',
          },
        ],
        completionDate: '2024-03',
        clientName: 'SecureBank',
      },
    ]

    for (const project of projects) {
      await client.create(project)
      console.log(`✅ Created project: "${project.title}"`)
    }
    console.log()

    console.log('🎉 Content migration completed successfully!')
    console.log('\n📌 Next steps:')
    console.log('1. Open Sanity Studio at http://localhost:3333')
    console.log('2. Upload actual images for the homepage headshot and thumbnails')
    console.log('3. Edit the placeholder content to match your actual information')
    console.log('4. Update social links and contact information')
  } catch (error) {
    console.error('❌ Error during migration:', error)
    process.exit(1)
  }
}

// Run the migration
migrateContent()
