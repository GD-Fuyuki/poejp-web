'use server'

import { cookies } from 'next/headers'
import axios from 'axios'
import qs from 'querystring';

const clientId = process.env.OAUTH_CLIENT_ID
const clientSecret = process.env.OAUTH_CLIENT_SECRET
const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/poe/callback`

// 環境変数が設定されていることを確認する関数
function assertEnvVar(varName: string): string {
  const value = process.env[varName]
  if (!value) {
    throw new Error(`Missing environment variable: ${varName}`)
  }
  return value
}

export async function TokenExhange() {
  const tokenEndpointAsserted = assertEnvVar('OAUTH_TOKEN_ENDPOINT')
  const cookieStore = cookies()
  const codeVerifier = cookieStore.get('code_verifier')?.value
  const code = cookieStore.get('code')?.value
  const params = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
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
  return(
    <div>
      tokenResponse
    </div>
  ) ;
}
