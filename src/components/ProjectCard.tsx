import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/types/cms'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {project.thumbnail && (
        <div className="relative w-full h-48">
          <Image
            src={project.thumbnail.url}
            alt={project.thumbnail.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
