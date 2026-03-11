import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import About from '@/components/About'
import FeaturedProjects from '@/components/FeaturedProjects'
import RecentBlogPosts from '@/components/RecentBlogPosts'
import Skills from '@/components/Skills'
import {
  getHomepageContent,
  getFeaturedProjects,
  getRecentBlogPosts,
  getSkills,
} from '@/lib/cms'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepageContent()

  return {
    title: `${homepage.name} | ${homepage.title}`,
    description: homepage.tagline,
    openGraph: {
      title: `${homepage.name} | ${homepage.title}`,
      description: homepage.tagline,
      type: 'website',
      images: [
        {
          url: homepage.headshot.url,
          alt: homepage.headshot.alt,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${homepage.name} | ${homepage.title}`,
      description: homepage.tagline,
      images: [homepage.headshot.url],
    },
  }
}

export default async function HomePage() {
  const [homepage, featuredProjects, recentPosts, skills] = await Promise.all([
    getHomepageContent(),
    getFeaturedProjects(3),
    getRecentBlogPosts(3),
    getSkills(),
  ])

  return (
    <main>
      <Hero content={homepage} />
      <About bio={homepage.bio} />
      <Skills skills={skills} />
      <FeaturedProjects projects={featuredProjects} />
      <RecentBlogPosts posts={recentPosts} />
    </main>
  )
}
