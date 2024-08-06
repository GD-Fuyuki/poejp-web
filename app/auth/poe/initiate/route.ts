import { NextResponse } from 'next/server'
import { generateCodeVerifier, generateCodeChallenge } from '@/lib/pkce'

const clientId = process.env.OAUTH_CLIENT_ID
const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/poe/callback`
const authorizationEndpoint = process.env.OAUTH_AUTHORIZATION_ENDPOINT

export async function GET() {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = generateCodeChallenge(codeVerifier)
  const state = crypto.randomUUID()
  const authUrl = `${authorizationEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&state=${state}&scope=account:profile&code_challenge=${codeChallenge}&code_challenge_method=S256`

  const response = NextResponse.json({ authUrl })
  response.cookies.set('code_verifier', codeVerifier, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 60 * 1 // 10 minutes
  })
  response.cookies.set('oauth_state', state, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 60 * 1 // 10 minutes
  })

  await new Promise(resolve => setTimeout(resolve, 1000))
  return response
}