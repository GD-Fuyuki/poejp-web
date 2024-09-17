'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './button'

const Logined = (props: any) => {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const router = useRouter()
    const logout = async () => {
        await fetch('/auth/poe/logout', { method: 'POST' })
        setAccessToken(null)
        setUsername(null)
        router.refresh()
      }
  return (
    <div className='flex items-center gap-2'>
        {props.username}
        <Button variant="default" onClick={logout}>Logout</Button>
    </div>
  )
}

export default Logined