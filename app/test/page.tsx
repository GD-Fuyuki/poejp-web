'use client'
import { Suspense } from 'react';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  sub: string;
  username: string;
}

const fetchOAuthToken = async () => {
    const response = await fetch('/outh/poe/test');
    if (!response.ok) {
        throw new Error('Failed to fetch OAuth token');
      }
      return response.json();
  }

function TokenDisplay({ token }: { token: TokenResponse }) {
  return (
    <pre style={{
      backgroundColor: '#f4f4f4',
      padding: '10px',
      borderRadius: '5px',
      overflowX: 'auto',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word'
    }}>
      {JSON.stringify(token, null, 2)}
    </pre>
  );
}

export default function OAuthTokenPage() {
  const token: any = fetchOAuthToken();

  return (
    <div>
      <h1>OAuth Token</h1>
      <Suspense fallback={<div>Loading token...</div>}>
        <TokenDisplay token={token} />
      </Suspense>
    </div>
  );
}