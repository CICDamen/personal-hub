/**
 * Unit tests for BlogPostCard component
 */

import { render, screen } from '@testing-library/react'
import BlogPostCard from '@/components/BlogPostCard'
import type { BlogPost } from '@/types/cms'

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

describe('BlogPostCard Component', () => {
  const mockPost: BlogPost = {
    id: 'post-1',
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React development',
    slug: 'getting-started-react',
    publishedDate: '2024-01-15',
    thumbnail: {
      url: 'https://example.com/post.jpg',
      alt: 'React tutorial thumbnail',
    },
    author: 'John Doe',
    readingTime: 5,
    content: 'Full post content',
  }

  it('should render post title and excerpt', () => {
    render(<BlogPostCard post={mockPost} />)

    expect(screen.getByText('Getting Started with React')).toBeInTheDocument()
    expect(screen.getByText('Learn the basics of React development')).toBeInTheDocument()
  })

  it('should render link to blog post detail page', () => {
    render(<BlogPostCard post={mockPost} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blog/getting-started-react')
  })

  it('should render thumbnail when provided', () => {
    render(<BlogPostCard post={mockPost} />)

    const image = screen.getByAltText('React tutorial thumbnail')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/post.jpg')
  })

  it('should render formatted published date', () => {
    render(<BlogPostCard post={mockPost} />)

    expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
  })

  it('should render reading time when provided', () => {
    render(<BlogPostCard post={mockPost} />)

    expect(screen.getByText('5 min read')).toBeInTheDocument()
  })

  it('should not render thumbnail when not provided', () => {
    const postWithoutThumb = {
      ...mockPost,
      thumbnail: undefined,
    }

    render(<BlogPostCard post={postWithoutThumb} />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('should not render reading time when not provided', () => {
    const postWithoutReadingTime = {
      ...mockPost,
      readingTime: undefined,
    }

    render(<BlogPostCard post={postWithoutReadingTime} />)

    expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
    expect(screen.queryByText(/min read/)).not.toBeInTheDocument()
  })

  it('should render correct datetime attribute', () => {
    render(<BlogPostCard post={mockPost} />)

    const timeElement = screen.getByText('January 15, 2024')
    expect(timeElement.closest('time')).toHaveAttribute('dateTime', '2024-01-15')
  })
})
