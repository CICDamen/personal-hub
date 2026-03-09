/**
 * Smoke tests - verify the running app serves key routes successfully.
 * Requires the app to be running at INTEGRATION_BASE_URL (default: http://localhost:3000).
 * Uses the development Sanity dataset for real content validation.
 */

const BASE_URL = process.env.INTEGRATION_BASE_URL || 'http://localhost:3000'

describe('smoke tests', () => {
  it('health check returns 200', async () => {
    const response = await fetch(`${BASE_URL}/api/health`)
    expect(response.status).toBe(200)
  })

  it('homepage returns 200', async () => {
    const response = await fetch(`${BASE_URL}/`)
    expect(response.status).toBe(200)
  })

  it('blog listing returns 200', async () => {
    const response = await fetch(`${BASE_URL}/blog`)
    expect(response.status).toBe(200)
  })

  it('projects listing returns 200', async () => {
    const response = await fetch(`${BASE_URL}/projects`)
    expect(response.status).toBe(200)
  })

  it('homepage does not render an error page', async () => {
    const response = await fetch(`${BASE_URL}/`)
    const html = await response.text()
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).not.toContain('Application error')
  })
})
