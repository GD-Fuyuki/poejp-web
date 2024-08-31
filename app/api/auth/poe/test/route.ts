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
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const code = cookieStore.get('code')?.value
  const codeVerifier = cookieStore.get('code_verifier')?.value

  console.log('start fetch poe access token')

  try {
    const response = await axios.post<TokenResponse>(
      'https://www.pathofexile.com/oauth/token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        scope: 'account:profile account:leagues account:stashes account:characters account:league_accounts',
        code_verifier: codeVerifier
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
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