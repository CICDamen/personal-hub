import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * Disable Draft Mode API Route
 *
 * This route disables Next.js Draft Mode to return to viewing published content.
 * Can be called directly or added as a link/button in the UI for editors.
 *
 * Usage:
 * https://your-site.com/api/disable-draft
 *
 * @see https://nextjs.org/docs/app/building-your-application/configuring/draft-mode
 */

export async function GET() {
  const draft = await draftMode()
  draft.disable()

  return NextResponse.json({ message: 'Draft mode disabled' })
}
