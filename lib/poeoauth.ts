'use server'

import axios from 'axios';
import querystring from 'querystring';

export async function getAccessToken(
  code: string,
  codeVerifier: string
){
  const tokenEndpoint: any = process.env.OAUTH_TOKEN_ENDPOINT;
  const redirectUri = process.env.OAUTH_REDIRECT_URI;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('OAuth client credentials are not set in environment variables');
  }

  const param = querystring.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    scope: 'account:profile+account:leagues+account:stashes+account:characters+account:league_accounts',
    code_verifier: codeVerifier
  });

  console.log('param:', param)
  console.log('endpoint', tokenEndpoint)
  try {
    const response = await axios.post(tokenEndpoint, param, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.log(error);
      });;

    return response;
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