import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import axios from 'axios'

const clientId = process.env.OAUTH_CLIENT_ID
const clientSecret = process.env.OAUTH_CLIENT_SECRET
const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/poe/callback`
const scope = process.env.OAUTH_SCOPE

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

  if (!code || !state || state !== storedState) {
    return NextResponse.json({ error: 'Invalid state or missing code' }, { status: 400 })
  }

  try {
    const tokenResponse = await axios.post(tokenEndpointAsserted, null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri,
        scope: scope,
      },
      headers: {
        Accept: 'application/json',
      },
    })

    const { access_token } = tokenResponse.data

    // Fetch user information
    const userResponse = await axios.get('https://api.pathofexile.com/profile', {
      headers: {
        Authorization: `token ${access_token}`,
      },
    })

    const { login: username } = userResponse.data

    const redirectResponse = NextResponse.redirect(new URL('/', request.url))
    redirectResponse.cookies.set('oauth_state', '', { maxAge: 0 })
    redirectResponse.cookies.set('accessToken', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 1 day
    })
    redirectResponse.cookies.set('username', username, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 1 day
    })

    return redirectResponse
  } catch (error) {
    console.error('Error exchanging code for token:', error)
    return NextResponse.json({ error: 'Failed to exchange code for token' }, { status: 500 })
  }
}