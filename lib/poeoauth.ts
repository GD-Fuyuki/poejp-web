import axios from 'axios';
import querystring from 'querystring';

interface GetAccessTokenParams {
  code: string;
  codeVerifier: string;
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

export async function getAccessToken(
  code: string,
  codeVerifier: string
){
  const tokenEndpoint = 'https://www.pathofexile.com/oauth/token';
  const redirectUri = 'https://poe-jp.com/auth/poe/callback';
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

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
    // code_verifier: codeVerifier
  });

  console.log('param', data)

  try {
    const response = await axios.post<TokenResponse>(tokenEndpoint, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });;
    
    console.log('endpoint', tokenEndpoint)

    return data;
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