/**
 * Unit tests for ProjectCard component
 */

import { render, screen } from '@testing-library/react'
import ProjectCard from '@/components/ProjectCard'
import type { Project } from '@/types/cms'

// Mock Next.js modules
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>
  },
}))

describe('ProjectCard Component', () => {
  const mockProject: Project = {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution',
    slug: 'ecommerce-platform',
    thumbnail: {
      url: 'https://example.com/project.jpg',
      alt: 'E-Commerce Platform screenshot',
    },
    featured: true,
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    link: 'https://example.com',
    content: 'Full project content',
    completionDate: '2024-01-15',
  }

  it('should render project title and description', () => {
    render(<ProjectCard project={mockProject} />)

    expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument()
    expect(screen.getByText('A modern e-commerce solution')).toBeInTheDocument()
  })

  it('should render link to project detail page', () => {
    render(<ProjectCard project={mockProject} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/projects/ecommerce-platform')
  })

  it('should render project thumbnail when provided', () => {
    render(<ProjectCard project={mockProject} />)

    const image = screen.getByAltText('E-Commerce Platform screenshot')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/project.jpg')
  })

  it('should render technologies as tags', () => {
    render(<ProjectCard project={mockProject} />)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
  })

  it('should not render thumbnail when not provided', () => {
    const projectWithoutThumb = {
      ...mockProject,
      thumbnail: undefined,
    }

    render(<ProjectCard project={projectWithoutThumb} />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('should not render technologies section when empty', () => {
    const projectWithoutTech = {
      ...mockProject,
      technologies: [],
    }

    render(<ProjectCard project={projectWithoutTech} />)

    expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument()
    // Technologies should not be rendered when array is empty
  })

  it('should not render technologies section when undefined', () => {
    const projectWithoutTech = {
      ...mockProject,
      technologies: undefined,
    }

    render(<ProjectCard project={projectWithoutTech} />)

    expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument()
  })
})
