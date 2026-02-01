/**
 * Unit tests for About component
 */

import { render, screen } from '@testing-library/react'
import About from '@/components/About'

describe('About Component', () => {
  it('should render the bio text', () => {
    const bio = 'I am a passionate software engineer with 10 years of experience.'
    render(<About bio={bio} />)

    expect(screen.getByText(bio)).toBeInTheDocument()
  })

  it('should render the "About Me" heading', () => {
    render(<About bio="Test bio" />)

    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
  })

  it('should render with different bio content', () => {
    const differentBio = 'A different professional background story.'
    render(<About bio={differentBio} />)

    expect(screen.getByText(differentBio)).toBeInTheDocument()
  })

  it('should handle empty bio gracefully', () => {
    render(<About bio="" />)

    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
  })
})
