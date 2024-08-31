

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

  console.log('starting connect token endpoint...');
    const tokenData = await getAccessToken(code, codeVerifier);

    cookies().set('code_verifier', '', {
      maxAge: 0
    })
    cookies().set('oauth_state', '', {
      maxAge: 0
    })

    console.log('token:',tokenData)
    const redirectResponse = NextResponse.redirect(new URL('/', request.url))

    console.log('return redirect Response...')
    return redirectResponse
  }