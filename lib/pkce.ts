import { sha256 } from 'js-sha256'

export function generateCodeVerifier(): string {
  const array = new Uint32Array(56)
  crypto.getRandomValues(array)
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('')
}

export function generateCodeChallenge(codeVerifier: string): string {
  const hash = sha256(codeVerifier)
  return base64UrlEncode(hash)
}

function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export function initiatePKCEFlow() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    
    // Store codeVerifier securely (e.g., in session or encrypted cookie)
    // Use codeChallenge in the authorization request
    
    return { codeChallenge };
  }