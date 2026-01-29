import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/cms'
import BlogPostCard from '@/components/BlogPostCard'
import type { Metadata } from 'next'

// Revalidate this page every 1 hour (3600 seconds)
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog | Casper Damen',
  description: 'Explore articles and insights on web development, TypeScript, scalable architecture, and modern software engineering practices.',
  openGraph: {
    title: 'Blog | Casper Damen',
    description: 'Explore articles and insights on web development, TypeScript, scalable architecture, and modern software engineering practices.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Casper Damen',
    description: 'Explore articles and insights on web development, TypeScript, scalable architecture, and modern software engineering practices.',
  },
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back Navigation */}
        <Link
          href="/"
          className="group mb-8 inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Back to Home"
        >
          <svg
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Page Header */}
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-gray-600">
            Thoughts on software development, architecture, and technology trends
          </p>
        </header>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </section>
        ) : (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-600">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  )
}
