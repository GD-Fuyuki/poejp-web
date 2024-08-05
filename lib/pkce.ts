import { sha256 } from 'js-sha256'

export function generateCodeVerifier(): string {
  const array = new Uint32Array(56)
  crypto.getRandomValues(array)
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('')
}

export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const digest = sha256(codeVerifier)
  return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}