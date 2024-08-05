import { NextResponse } from 'next/server'

const clientId = process.env.OAUTH_CLIENT_ID
const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/poe/callback`
const authorizationEndpoint = process.env.OAUTH_AUTHORIZATION_ENDPOINT

export async function GET() {
  const state = crypto.randomUUID()
  const authUrl = `${authorizationEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&state=${state}&scope=account:profile`

  const response = NextResponse.json({ authUrl })
  response.cookies.set('oauth_state', state, { 
    httpOnly: true, 
    // secure: process.env.NODE_ENV === 'production',
    secure: false,
    sameSite: 'lax',
    maxAge: 60 * 10 // 10 minutes
  })

  return response
}