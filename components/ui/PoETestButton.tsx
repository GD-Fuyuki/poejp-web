'use client'

import { useRouter } from 'next/navigation'
import { Button } from './button'

export default function PoETestButton() {
  const router = useRouter()

  const fetchOAuthToken = async () => {
    const response = await fetch('/outh/poe/test');
    if (!response.ok) {
        throw new Error('Failed to fetch OAuth token');
      }
      return response.json();
  }

  return (
    <>
      <Button variant="secondary" onClick={fetchOAuthToken}>fetchOAuthToken</Button>
    </>
  )
}