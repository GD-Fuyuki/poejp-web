import crypto from 'crypto';

export function generateCodeVerifier() {
    return crypto.randomBytes(43).toString('base64url');
  }

export function generateCodeChallenge(codeVerifier: string): string {
  const hash = crypto.createHash('sha256').update(codeVerifier).digest();
  return base64UrlEncode(hash);
}

function base64UrlEncode(buffer: Buffer): string {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function initiatePKCEFlow() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  
  // Store codeVerifier securely (e.g., in session or encrypted cookie)
  // Use codeChallenge in the authorization request
  
  return { codeVerifier, codeChallenge };
}