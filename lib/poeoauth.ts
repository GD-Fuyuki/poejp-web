export async function getAccessToken(
  code: string,
  codeVerifier: string
){
  const tokenEndpoint: any = process.env.OAUTH_TOKEN_ENDPOINT;
  const redirectUri: any = process.env.OAUTH_REDIRECT_URI;
  const clientId: any = process.env.OAUTH_CLIENT_ID;
  const clientSecret: any = process.env.OAUTH_CLIENT_SECRET;
  
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
  }).then((response) => response.json()) 

  return response;
}