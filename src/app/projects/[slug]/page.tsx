import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/cms'
import type { Metadata } from 'next'

// Revalidate this page every 1 hour (3600 seconds)
export const revalidate = 3600

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: preview } = await draftMode()
  const project = await getProjectBySlug(slug, preview)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Casper Damen`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'website',
      images: project.thumbnail ? [{ url: project.thumbnail.url, alt: project.thumbnail.alt }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: project.thumbnail ? [project.thumbnail.url] : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const { isEnabled: preview } = await draftMode()
  const project = await getProjectBySlug(slug, preview)

  if (!project) {
    notFound()
  }

  const formattedDate = new Date(project.completionDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link
          href="/projects"
          className="group mb-8 inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Back to Projects"
        >
          <svg
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        {/* Project Header */}
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {project.title}
          </h1>

          <p className="mb-6 text-xl text-gray-600">{project.description}</p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Completed {formattedDate}</span>
            </div>
            {project.clientName && (
              <>
                <span className="text-gray-400">•</span>
                <div className="flex items-center">
                  <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Client: {project.clientName}</span>
                </div>
              </>
            )}
          </div>

          {/* External Link */}
          {project.link && (
            <div className="mt-6">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                View Project
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </header>

        {/* Featured Image */}
        {project.thumbnail && (
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-lg shadow-xl">
            <Image
              src={project.thumbnail.url}
              alt={project.thumbnail.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Project Content Sections */}
        <div className="space-y-12">
          {/* Overview */}
          <section>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Overview</h2>
            <p className="text-lg leading-relaxed text-gray-700">{project.content}</p>
          </section>

          {/* Challenge */}
          <section>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">The Challenge</h2>
            <p className="text-lg leading-relaxed text-gray-700">{project.challenge}</p>
          </section>

          {/* Solution */}
          <section>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">The Solution</h2>
            <p className="text-lg leading-relaxed text-gray-700">{project.solution}</p>
          </section>

          {/* Outcomes */}
          <section>
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Key Outcomes</h2>
            <ul className="space-y-4">
              {project.outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-lg text-gray-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Project Images */}
          {project.images && project.images.length > 0 && (
            <section>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Project Gallery</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
                  >
                    <Image src={image.url} alt={image.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Back Navigation (Bottom) */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/projects"
            className="group inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Back to Projects"
          >
            <svg
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </article>
    </main>
  )
}
