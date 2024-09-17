'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './button'
import Logined from './logined'

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

  return (
    <div>
      {!accessToken ? (
        <Button variant="default" onClick={initiateOAuth}>Login with PoE Account</Button>
      ) : (
        <div>
          <Logined username={username}/>
        </div>
      )}
    </div>
  )
}