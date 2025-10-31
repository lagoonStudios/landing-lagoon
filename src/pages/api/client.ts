import type { APIRoute } from 'astro'

type D1Result<T = unknown> = {
  success: boolean
  results?: T[]
  error?: string
}

type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement
  run<T = unknown>(): Promise<D1Result<T>>
}

type D1Database = {
  prepare(query: string): D1PreparedStatement
}

// This is required for Server-Side Rendered (SSR) API routes
// The export const prerender = false; flag ensures this route is handled by the worker.
export const prerender = false

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const wantsJson =
    request.headers.get('accept')?.includes('application/json') ||
    request.headers.get('x-requested-with') === 'XMLHttpRequest'

  const respondWithError = (message: string, status: number) =>
    wantsJson ? Response.json({ error: message }, { status }) : new Response(message, { status })

  try {
    const db = locals.runtime?.env?.DB as D1Database | undefined

    if (!db) {
      console.error('D1 database binding (locals.runtime.env.DB) is missing.')
      return respondWithError('Database is not configured.', 500)
    }

    const formData = await request.formData()

    const name = formData.get('name')?.toString().trim() || null
    const email = formData.get('email')?.toString().trim() || null
    const message = formData.get('message')?.toString().trim()
    console.log({ formData })
    if (!message) {
      return respondWithError('Message cannot be empty.', 422)
    }

    const { success, error } = await db
      .prepare('INSERT INTO clients (name, email, message) VALUES (?1, ?2, ?3)')
      .bind(name, email, message)
      .run()

    if (success) {
      if (wantsJson) {
        return Response.json({ success: true }, { status: 201 })
      }

      const referer = request.headers.get('referer')
      const redirectUrl = referer ? new URL(referer) : new URL('/', request.url)
      redirectUrl.searchParams.set('success', 'true')

      return redirect(redirectUrl.toString(), 303)
    }

    console.error('D1 insert failed:', error)
    return respondWithError('Failed to save message to database.', 500)
  } catch (error) {
    console.error('API error:', error)
    return respondWithError('An unexpected server error occurred.', 500)
  }
}

export const GET: APIRoute = async ({ request }) => {
  return Response.json({ success: true })
}
