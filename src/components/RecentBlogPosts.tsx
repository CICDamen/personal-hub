import Link from 'next/link'
import type { BlogPost } from '@/types/cms'
import BlogPostCard from './BlogPostCard'

interface RecentBlogPostsProps {
  posts: BlogPost[]
}

export default function RecentBlogPosts({ posts }: RecentBlogPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Recent Blog Posts</h2>
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded px-2 py-1"
          >
            View All Posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
