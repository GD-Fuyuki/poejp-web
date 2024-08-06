import axios from 'axios';
import querystring from 'querystring';

interface GetAccessTokenParams {
  code: string;
  codeVerifier: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

export async function getAccessToken({
  code,
  codeVerifier
}: GetAccessTokenParams): Promise<TokenResponse> {
  const tokenEndpoint = 'https://www.pathofexile.com/oauth/token';
  const redirectUri = 'https://poe-jp.com/auth/poe/callback';
  const clientId = process.env.POE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.POE_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('OAuth client credentials are not set in environment variables');
  }

  const data = querystring.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    scope: 'account:profile',
    code_verifier: codeVerifier
  });

  console.log('param', data)

  try {
    const response = await axios.post<TokenResponse>(tokenEndpoint, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('OAuth error:', error.response.status, error.response.data);
      throw new Error(`OAuth token request failed: ${error.response.statusText}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred during the OAuth token request');
    }
  }
}