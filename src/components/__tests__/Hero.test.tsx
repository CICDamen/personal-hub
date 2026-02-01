/**
 * Unit tests for Hero component
 */

import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'
import type { Homepage } from '@/types/cms'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

describe('Hero Component', () => {
  const mockContent: Homepage = {
    name: 'John Doe',
    title: 'Software Engineer',
    tagline: 'Building amazing things',
    headshot: {
      url: 'https://example.com/headshot.jpg',
      alt: 'John Doe headshot',
    },
    bio: 'Experienced software engineer',
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
    contact: {
      email: 'john@example.com',
      location: 'San Francisco, CA',
    },
  }

  it('should render name, title, and tagline', () => {
    render(<Hero content={mockContent} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Building amazing things')).toBeInTheDocument()
  })

  it('should render headshot image with correct alt text', () => {
    render(<Hero content={mockContent} />)

    const image = screen.getByAltText('John Doe headshot')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/headshot.jpg')
  })

  it('should render social links when provided', () => {
    render(<Hero content={mockContent} />)

    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe')
    expect(githubLink).toHaveAttribute('target', '_blank')

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toBeInTheDocument()
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
  })

  it('should render email contact link', () => {
    render(<Hero content={mockContent} />)

    const emailLink = screen.getByText('john@example.com')
    expect(emailLink).toBeInTheDocument()
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:john@example.com')
  })

  it('should render location when provided', () => {
    render(<Hero content={mockContent} />)

    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
  })

  it('should not render social links when not provided', () => {
    const contentWithoutSocial: Homepage = {
      ...mockContent,
      socialLinks: {},
    }

    render(<Hero content={contentWithoutSocial} />)

    expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /linkedin/i })).not.toBeInTheDocument()
  })

  it('should not render email when not provided', () => {
    const contentWithoutEmail: Homepage = {
      ...mockContent,
      contact: { location: 'San Francisco, CA' },
    }

    render(<Hero content={contentWithoutEmail} />)

    expect(screen.queryByText(/mailto:/)).not.toBeInTheDocument()
  })

  it('should not render location when not provided', () => {
    const contentWithoutLocation: Homepage = {
      ...mockContent,
      contact: { email: 'john@example.com' },
    }

    render(<Hero content={contentWithoutLocation} />)

    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.queryByText('San Francisco, CA')).not.toBeInTheDocument()
  })
})
