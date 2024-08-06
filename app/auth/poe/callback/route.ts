'use server'

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import axios from 'axios'
import qs from 'querystring';

const clientId = process.env.OAUTH_CLIENT_ID
const clientSecret = process.env.OAUTH_CLIENT_SECRET
const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/poe/callback`
const scope = process.env.OAUTH_SCOPE
const grant_type = 'authorization_code'

// 環境変数が設定されていることを確認する関数
function assertEnvVar(varName: string): string {
  const value = process.env[varName]
  if (!value) {
    throw new Error(`Missing environment variable: ${varName}`)
  }
  return value
}

export async function GET(request: NextRequest) {
  const tokenEndpointAsserted = assertEnvVar('OAUTH_TOKEN_ENDPOINT')
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const cookieStore = cookies()
  const storedState = cookieStore.get('oauth_state')?.value
  const codeVerifier = cookieStore.get('code_verifier')?.value

  if (!code || !state || state !== storedState || !codeVerifier) {
    return NextResponse.json({ error: 'Invalid state or missing code' }, { status: 400 })
  }

  try {
    cookies().set('test_dummy1', 'test1', {
      maxAge: 100
    })

    const params = {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: grant_type,
      code: code,
      redirect_uri: redirectUri,
      scope: 'account:profile',
      code_verifier: codeVerifier
    };

    const tokenResponse = await axios.post(tokenEndpointAsserted, qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    cookies().set('test_dummy2', 'test2', {
      maxAge: 100
    })


    // const { access_token } = tokenResponse.data
    // const { username } = tokenResponse.data

    // Fetch user information
    // const userResponse = await axios.get('https://api.pathofexile.com/profile', {
    //   headers: {
    //     Authorization: `token ${access_token}`,
    //   },
    // })

    // const { login: username } = userResponse.data

    cookies().set('code_verifier', '', {
      maxAge: 0
    })
    cookies().set('oauth_state', '', {
      maxAge: 0
    })

    // cookies().set('accessToken', access_token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
    //   maxAge: 3600 * 24,
    //   domain: process.env.NEXT_PUBLIC_DOMAIN,
    //   path: '/',
    // })
  
    // cookies().set('username', username, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
    //   maxAge: 3600 * 24,
    //   domain: process.env.NEXT_PUBLIC_DOMAIN,
    //   path: '/',
    // })

    cookies().set('test_dummy3', 'test3', {
      maxAge: 100
    })

    const redirectResponse = NextResponse.redirect(new URL('/', request.url))
    // redirectResponse.cookies.set('oauth_state', '', { maxAge: 0 })
    // redirectResponse.cookies.set('code_verifier', '', { maxAge: 0 })
    // redirectResponse.cookies.set('accessToken', access_token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'lax',
    //   maxAge: 60 * 60 * 24 // 1 day
    // })
    // redirectResponse.cookies.set('username', username, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'lax',
    //   maxAge: 60 * 60 * 24 // 1 day
    // })

    return redirectResponse
  } catch (error) {
    console.error('Error exchanging code for token:', error)
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data)
      console.error('Response status:', error.response?.status)
    }
    return NextResponse.json({ error: 'Failed to exchange code for token' }, { status: 500 })
  }
}