'use server'

import axios from 'axios';
import querystring from 'querystring';

export async function getAccessToken(
  code: string,
  codeVerifier: string
){
  const tokenEndpoint: any = process.env.AUTH0_TOKEN_ENDPOINT;
  const redirectUri: any = process.env.AUTH0_REDIRECT_URI;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const clientSecret = process.env.AUTH0_CLIENT_SECRET;

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
    // scope: 'account:profile',
    code_verifier: codeVerifier
  };

  console.log('params:', params)
  console.log('endpoint', tokenEndpoint)


    const response = await axios.post(tokenEndpoint, params, config).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.log(error);
      });;

    return response;

}