'use server'

import { NextResponse } from 'next/server'
import { initiatePKCEFlow } from '@/lib/pkce'
import { cookies } from 'next/headers'

const clientId = process.env.AUTH0_CLIENT_ID
const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/auth0/callback`
const authorizationEndpoint = process.env.AUTH0_AUTHORIZATION_ENDPOINT

export async function GET() {

  const { codeVerifier, codeChallenge } = initiatePKCEFlow();
  console.log(codeVerifier);
  console.log(codeChallenge);
  const state = crypto.randomUUID()
  const authUrl = `${authorizationEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&state=${state}&scope=account:profile&code_challenge=${codeChallenge}&code_challenge_method=S256`
  // const authUrl = `${authorizationEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&state=${state}&scope=account:profile`

  cookies().set('code_verifier', codeVerifier, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 600, // 1 hour
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    path: '/',
  })

  cookies().set('oauth_state', state, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 600, // 1 hour
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    path: '/',
  })

  const response = NextResponse.json({ authUrl })
  // response.cookies.set('code_verifier', codeVerifier, { 
  //   httpOnly: true, 
  //   secure: true,
  //   sameSite: 'none',
  //   path: '/',
  //   domain: process.env.NEXT_PUBLIC_DOMAIN,
  //   maxAge: 60 * 1 // 10 minutes
  // })
  // response.cookies.set('oauth_state', state, { 
  //   httpOnly: true, 
  //   secure: true,
  //   sameSite: 'none',
  //   path: '/',
  //   domain: process.env.NEXT_PUBLIC_DOMAIN,
  //   maxAge: 60 * 1 // 10 minutes
  // })
  
  return response
}