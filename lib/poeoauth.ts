'use server'

import axios from 'axios';
import querystring from 'querystring';

function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

interface TokenRequestParams {
  code: string;
  codeVerifier: string;
  scope?: string;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  username: string;
  sub: string;
  refresh_token?: string;
}

export async function getAccessToken(code: string, codeVerifier: string) {
  const tokenEndpoint = getEnvVariable('OAUTH_TOKEN_ENDPOINT');
  const clientId = getEnvVariable('OAUTH_CLIENT_ID');
  const clientSecret = getEnvVariable('OAUTH_CLIENT_SECRET');
  const redirectUri = getEnvVariable('OAUTH_REDIRECT_URI');

  console.log(code);
  console.log(codeVerifier);

  var params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);
  params.append('scope', 'account:profile');
  params.append('code_verifier', codeVerifier);

  console.log('params', params);

  const data = querystring.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    scope: 'account:profile',
    code_verifier: codeVerifier,
  });

  try {
    console.log('tokenendpoint', tokenEndpoint);
    const response = await axios.post(tokenEndpoint, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return parseTokenResponse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('OAuth error:', error.response.status, error.response.statusText);
      throw new Error(`OAuth token request failed: ${error.response.statusText}`);
    } else {
      console.error('Unexpected error during token request');
      throw new Error('An unexpected error occurred during the OAuth token request');
    }
  }
}

function parseTokenResponse(data: any): TokenResponse {
  const requiredFields: (keyof TokenResponse)[] = [
    'access_token', 'expires_in', 'token_type', 'scope',
    'username', 'sub'
  ];

  for (const field of requiredFields) {
    if (!(field in data)) {
      throw new Error(`Missing required field in token response: ${field}`);
    }
  }

  if (
    typeof data.access_token !== 'string' ||
    typeof data.expires_in !== 'number' ||
    typeof data.token_type !== 'string' ||
    typeof data.scope !== 'string' ||
    typeof data.username !== 'string' ||
    typeof data.sub !== 'string' ||
    (data.refresh_token !== undefined && typeof data.refresh_token !== 'string')
  ) {
    throw new Error('Invalid token response format');
  }

  return {
    access_token: data.access_token,
    expires_in: data.expires_in,
    token_type: data.token_type,
    scope: data.scope,
    username: data.username,
    sub: data.sub,
    refresh_token: data.refresh_token as string | undefined,
  };
}