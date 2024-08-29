'use server'

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAccessToken } from '@/lib/poeoauth';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const tokenEndpoint: any = process.env.OAUTH_TOKEN_ENDPOINT;
  const redirectUri: any = process.env.OAUTH_REDIRECT_URI;
  const clientId: any = process.env.OAUTH_CLIENT_ID;
  const clientSecret: any = process.env.OAUTH_CLIENT_SECRET;
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

  var params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);
  params.append('scope', 'account:profile account:leagues account:stashes account:characters account:league_accounts');
  params.append('code_verifier', codeVerifier);
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }


  console.log('starting connect token endpoint...');
  const response = await axios.post(tokenEndpoint, params, config)
    // const tokenData = await getAccessToken(code, codeVerifier);
    // console.log('tokenData:',tokenData);

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

    console.log('return redirect Response...')
    return redirectResponse
  }