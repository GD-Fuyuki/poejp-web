'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './button'

export default function PoeOAuthButton() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await fetch('/auth/poe/status')
      const data = await response.json()
      if (data.isLoggedIn) {
        setAccessToken(data.accessToken)
        setUsername(data.username)
      }
    }

    checkAuthStatus()
  }, [])

  const initiateOAuth = async () => {
    const response = await fetch('/auth/poe/initiate')
    const { authUrl } = await response.json()
    router.push(authUrl)
  }

  const logout = async () => {
    await fetch('/auth/poe/logout', { method: 'POST' })
    setAccessToken(null)
    setUsername(null)
    router.refresh()
  }

  return (
    <div>
      {!accessToken ? (
        <Button variant="secondary" onClick={initiateOAuth}>Login with PoE Acoount</Button>
      ) : (
        <div>
          <p>ログイン済: {username}</p>
          <Button variant="secondary" onClick={logout}>Logout</Button>
        </div>
      )}
    </div>
  )
}