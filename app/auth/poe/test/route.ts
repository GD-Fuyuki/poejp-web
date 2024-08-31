// app/api/oauth/token/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers'
import * as https from "https";

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

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'client_id': clientId,
      'client_secret': clientSecret,
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': redirectUri,
      'scope': 'account:profile account:leagues account:stashes account:characters account:league_accounts',
      'code_verifier': codeVerifier
    })
  })

  console.log(response)

  return NextResponse.json(response)
}