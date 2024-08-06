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

export async function getAccessToken({ code, codeVerifier, scope = 'account:profile' }: TokenRequestParams): Promise<TokenResponse> {
  const tokenEndpoint = getEnvVariable('OAUTH_TOKEN_ENDPOINT');
  const clientId = getEnvVariable('OAUTH_CLIENT_ID');
  const clientSecret = getEnvVariable('OAUTH_CLIENT_SECRET');
  const redirectUri = getEnvVariable('OAUTH_REDIRECT_URI');

  const data = querystring.stringify({
    grant_type: 'authorization_code',
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    scope,
    code_verifier: codeVerifier,
  });

  try {
    const response = await axios.post<Record<string, unknown>>(tokenEndpoint, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
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

function parseTokenResponse(data: Record<string, unknown>): TokenResponse {
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