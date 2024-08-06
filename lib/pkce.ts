import crypto from 'crypto';

export function generateCodeVerifier(): string {
  const buffer = crypto.randomBytes(32);
  return base64UrlEncode(buffer)
    .slice(0, 128);  // Ensure maximum length of 128
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