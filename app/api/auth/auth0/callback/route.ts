'use server'

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAccessToken } from '@/lib/poeoauth';


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const cookieStore = cookies()
  const storedState = cookieStore.get('oauth_state')?.value
  const codeVerifier = cookieStore.get('code_verifier')?.value
  console.log('code:',code);
  console.log('state:',state);
  console.log('storedState:',storedState);
  console.log('codeVerifier:',codeVerifier);

  if (!code || !state || state !== storedState || !codeVerifier) {
    return NextResponse.json({ error: 'Invalid state or missing code' }, { status: 400 })
  }
    const tokenData = await getAccessToken(code, codeVerifier);
    console.log('tokenData:',tokenData);

    // const { access_token } = tokenResponse.data
    // const { username } = tokenResponse.data

    cookies().set('code_verifier', '', {
      maxAge: 0
    })
    cookies().set('oauth_state', '', {
      maxAge: 0
    })

    // cookies().set('accessToken', access_token, {
    //   httpOnly: true,
    //   secure: false',
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

    const redirectResponse = NextResponse.redirect(new URL('/', request.url))

    return redirectResponse
  }