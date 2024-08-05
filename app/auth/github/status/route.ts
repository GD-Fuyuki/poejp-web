import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const username = cookieStore.get('username')?.value

  if (accessToken && username) {
    return NextResponse.json({ 
      isLoggedIn: true, 
      accessToken, 
      username 
    })
  } else {
    return NextResponse.json({ isLoggedIn: false })
  }
}