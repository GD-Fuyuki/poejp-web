import axios from 'axios';

function getEnvVariable(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Environment variable ${name} is not set`);
    }
    return value;
  }

export async function getAccessToken(code: string, codeVerifier: string) {
    const tokenEndpoint = getEnvVariable('OAUTH_TOKEN_ENDPOINT');
    const clientId = getEnvVariable('OAUTH_CLIENT_ID');
    const clientSecret = getEnvVariable('OAUTH_CLIENT_SECRET');
    const redirectUri = getEnvVariable('OAUTH_REDIRECT_URI');


  const response = await axios.post(tokenEndpoint, {
    grant_type: 'authorization_code',
    code: code,
    client_id: clientId,
    client_secre: clientSecret,
    redirect_uri: redirectUri,
    scope: 'account:profile',
    code_verifier: codeVerifier,
  });

  return response.data;
}

// export async function getUserData(accessToken: string) {
//   const userInfoEndpoint = process.env.OAUTH_USER_INFO_ENDPOINT;

//   const response = await axios.get(userInfoEndpoint, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   return response.data;
// }