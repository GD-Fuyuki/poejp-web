import crypto from 'crypto';

// 64文字の固定長Code Verifierを生成する関数
export function generateCodeVerifier(): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const randomBytes = crypto.randomBytes(64);
  return Array.from(randomBytes, byte => charset[byte % charset.length]).join('');
}

// Code Challengeを生成する関数
export function generateCodeChallenge(codeVerifier: string): string {
  const hash = crypto.createHash('sha256').update(codeVerifier).digest();
  return base64UrlEncode(hash);
}

// Base64Urlエンコーディングを行う関数
function base64UrlEncode(buffer: Buffer): string {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// PKCEフローを開始する関数
export function initiatePKCEFlow() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  
  return { codeVerifier, codeChallenge };
}