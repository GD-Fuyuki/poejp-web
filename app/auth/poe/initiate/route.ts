import { NextResponse } from 'next/server'
import { initiatePKCEFlow } from '@/lib/pkce'
import { cookies } from 'next/headers'

const clientId = process.env.OAUTH_CLIENT_ID
const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/poe/callback`
const authorizationEndpoint = process.env.OAUTH_AUTHORIZATION_ENDPOINT

export async function GET() {

  const { codeVerifier, codeChallenge } = initiatePKCEFlow();
  const state = crypto.randomUUID()
  const authUrl = `${authorizationEndpoint}?client_id=${clientId}&response_type=code&scope=account:profile account:leagues account:stashes account:characters account:league_accounts&state=${state}&redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=S256`

  cookies().set('code_verifier', codeVerifier, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 600, // 1 hour
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    path: '/',
  })

  cookies().set('oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 600, // 1 hour
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    path: '/',
  })

  const response = NextResponse.json({ authUrl })
  
  return response
}