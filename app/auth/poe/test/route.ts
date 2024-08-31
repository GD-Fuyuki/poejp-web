// app/api/oauth/token/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers'

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  sub: string;
  username: string;
}

export async function GET() {
  const cookieStore = cookies()

  const tokenEndpoint: any = process.env.OAUTH_TOKEN_ENDPOINT;
  const redirectUri: any = process.env.OAUTH_REDIRECT_URI;
  const clientId: any = process.env.OAUTH_CLIENT_ID;
  const clientSecret: any = process.env.OAUTH_CLIENT_SECRET;
  const code: any = cookieStore.get('code')?.value
  const codeVerifier: any = cookieStore.get('code_verifier')?.value

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


  console.log('start fetch poe access token')
  console.log('param:', params)
  
  try {
    const response = await axios.post<TokenResponse>(
      'https://www.pathofexile.com/oauth/token',
      params,
      config
    );

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: `OAuth token request failed: ${error.response.data.error}` },
        { status: error.response.status }
      );
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}