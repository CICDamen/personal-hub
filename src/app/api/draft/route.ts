import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Draft Mode API Route
 *
 * This route enables Next.js Draft Mode for previewing unpublished content from Sanity.
 * It's called from Sanity Studio when editors want to preview their changes.
 *
 * Usage from Sanity Studio:
 * https://your-site.com/api/draft?secret=YOUR_SECRET&slug=/blog/post-slug
 *
 * Security:
 * - Requires a secret token to prevent unauthorized access
 * - Token should be stored in SANITY_REVALIDATE_SECRET environment variable
 *
 * @see https://nextjs.org/docs/app/building-your-application/configuring/draft-mode
 */

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  // Parse query parameters
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  // Validate the secret token
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

  if (!expectedSecret) {
    console.error('SANITY_REVALIDATE_SECRET is not configured')
    return NextResponse.json(
      { message: 'Draft mode is not configured on this server' },
      { status: 500 }
    )
  }

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 })
  }

  // Validate slug parameter
  if (!slug) {
    return NextResponse.json({ message: 'Missing slug parameter' }, { status: 400 })
  }

  // Enable Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the path from the slug parameter
  // This allows you to preview blog posts, projects, or any other content
  redirect(slug)
}
