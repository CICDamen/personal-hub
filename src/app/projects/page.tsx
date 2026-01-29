import Link from 'next/link'
import { getAllProjects } from '@/lib/cms'
import ProjectCard from '@/components/ProjectCard'
import type { Metadata } from 'next'

// Revalidate this page every 1 hour (3600 seconds)
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Projects | Casper Damen',
  description: 'Explore my portfolio of client projects, including e-commerce platforms, analytics dashboards, and mobile applications. See the challenges solved and outcomes achieved.',
  openGraph: {
    title: 'Projects | Casper Damen',
    description: 'Explore my portfolio of client projects, including e-commerce platforms, analytics dashboards, and mobile applications. See the challenges solved and outcomes achieved.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Casper Damen',
    description: 'Explore my portfolio of client projects, including e-commerce platforms, analytics dashboards, and mobile applications. See the challenges solved and outcomes achieved.',
  },
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

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
            Projects
          </h1>
          <p className="text-xl text-gray-600">
            A showcase of client work and technical solutions delivered
          </p>
        </header>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </section>
        ) : (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-600">No projects yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  )
}
