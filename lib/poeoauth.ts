'use server'

import axios from 'axios';

export async function getAccessToken(
  code: string,
  codeVerifier: string
){
  const tokenEndpoint: any = process.env.OAUTH_TOKEN_ENDPOINT;
  const redirectUri: any = process.env.OAUTH_REDIRECT_URI;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('OAuth client credentials are not set in environment variables');
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

  const param = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    scope: 'account:profile account:leagues account:stashes account:characters account:league_accounts',
    code_verifier: codeVerifier
  };

  console.log('param:', params)
  console.log('endpoint', tokenEndpoint)

  // try {
  //   const response = await axios.post(tokenEndpoint, params, config).then(function (response) {
  //       console.log(response.data);
  //     }).catch(function (error) {
  //       console.log(error);
  //     });;

  //   return response;
  // } catch (error) {
  //   if (axios.isAxiosError(error) && error.response) {
  //     console.error('OAuth error:', error.response.status, error.response.data);
  //     throw new Error(`OAuth token request failed: ${error.response.statusText}`);
  //   } else {
  //     console.error('Unexpected error:', error);
  //     throw new Error('An unexpected error occurred during the OAuth token request');
  //   }
  // }

  const tempuri = 'https://qneoaoyizh.execute-api.ap-northeast-1.amazonaws.com/develop/token'

  console.log('starting exchange code to token...')
  const response: any = await axios.post(tempuri, config).then(function (response) {console.log(response);})
  console.log(response)
  return response;
}