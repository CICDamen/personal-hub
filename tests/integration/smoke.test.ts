/**
 * Smoke tests - verify the running app serves key routes successfully.
 * Requires the app to be running at INTEGRATION_BASE_URL (default: http://localhost:3000).
 * Uses the development Sanity dataset for real content validation.
 */

const BASE_URL = process.env.INTEGRATION_BASE_URL || 'http://localhost:3000'

const ROUTES = [
  { path: '/', label: 'homepage' },
  { path: '/blog', label: 'blog listing' },
  { path: '/projects', label: 'projects listing' },
]

describe('smoke tests', () => {
  for (const { path, label } of ROUTES) {
    it(`${label} (${path}) returns 200`, async () => {
      const response = await fetch(`${BASE_URL}${path}`)
      expect(response.status).toBe(200)
    })
  }

  it('homepage contains expected content', async () => {
    const response = await fetch(`${BASE_URL}/`)
    const html = await response.text()
    expect(html).toContain('<!DOCTYPE html>')
    // Sanity content should be present (not an error page)
    expect(html).not.toContain('Application error')
  })
})
