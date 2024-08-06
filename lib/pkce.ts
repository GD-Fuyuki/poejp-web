import crypto from 'crypto';

// Code Verifier を生成する関数
export function generateCodeVerifier(): string {
  // 43 から 128 文字のランダムな文字列を生成
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const length = Math.floor(Math.random() * (128 - 43 + 1) + 43);
  const randomBytes = crypto.randomBytes(length);
  return Array.from(randomBytes, byte => characters[byte % characters.length]).join('');
}

// Code Challenge を生成する関数
export function generateCodeChallenge(codeVerifier: string): string {
  const hash = crypto.createHash('sha256').update(codeVerifier).digest();
  return base64UrlEncode(hash);
}

// Base64Url エンコーディングを行う関数
function base64UrlEncode(buffer: Buffer): string {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// PKCE フローを開始する関数
export function initiatePKCEFlow() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  
  return { codeVerifier, codeChallenge };
}