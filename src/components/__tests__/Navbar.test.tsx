/**
 * Unit tests for Navbar component (dark/light mode toggle)
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '@/components/Navbar'
import { ThemeContext } from '@/components/ThemeProvider'

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

const lightThemeContext = {
  theme: 'light' as const,
  toggleTheme: jest.fn(),
}

const darkThemeContext = {
  theme: 'dark' as const,
  toggleTheme: jest.fn(),
}

function renderWithTheme(themeContext: typeof lightThemeContext) {
  return render(
    <ThemeContext.Provider value={themeContext}>
      <Navbar />
    </ThemeContext.Provider>
  )
}

describe('Navbar dark/light mode toggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render theme toggle buttons', () => {
    renderWithTheme(lightThemeContext)
    const toggleButtons = screen.getAllByRole('button', { name: /switch to dark mode/i })
    expect(toggleButtons.length).toBeGreaterThan(0)
  })

  it('should show "Switch to dark mode" label when in light mode', () => {
    renderWithTheme(lightThemeContext)
    const toggleButtons = screen.getAllByRole('button', { name: /switch to dark mode/i })
    toggleButtons.forEach((btn) => expect(btn).toBeInTheDocument())
  })

  it('should show "Switch to light mode" label when in dark mode', () => {
    renderWithTheme(darkThemeContext)
    const toggleButtons = screen.getAllByRole('button', { name: /switch to light mode/i })
    toggleButtons.forEach((btn) => expect(btn).toBeInTheDocument())
  })

  it('should call toggleTheme when the toggle button is clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(lightThemeContext)
    const [firstToggle] = screen.getAllByRole('button', { name: /switch to dark mode/i })
    await user.click(firstToggle)
    expect(lightThemeContext.toggleTheme).toHaveBeenCalledTimes(1)
  })

  it('should render nav links', () => {
    renderWithTheme(lightThemeContext)
    expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /projects/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /blog/i }).length).toBeGreaterThan(0)
  })
})
