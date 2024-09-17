import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAccessToken } from '@/lib/poeoauth';
import { upsertUser } from '@/lib/actions';
import { PrismaClient } from '@prisma/client';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const cookieStore = cookies()
  const storedState = cookieStore.get('oauth_state')?.value
  const codeVerifier = cookieStore.get('code_verifier')?.value

  if (!code || !state || state !== storedState || !codeVerifier) {
    return NextResponse.json({ error: 'Invalid state or missing code' }, { status: 400 })
  }

    const tokenData = await getAccessToken(code, codeVerifier);

    cookies().set('code_verifier', '', {
      maxAge: 0
    })
    cookies().set('oauth_state', '', {
      maxAge: 0
    })
    cookies().set('username', tokenData.username, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: tokenData.expires_in,
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      path: '/',
    })
    cookies().set('accessToken', tokenData.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: tokenData.expires_in,
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      path: '/',
    })
    const prisma = new PrismaClient();
    try {
      await prisma.user.upsert({
        where: { name: tokenData.username },
        update: {}, // 既存のユーザーの場合、更新は行わない
        create: { name: tokenData.username }, // 新規ユーザーの場合、nameを設定して作成
      });
      console.log(`User ${tokenData.username} has been processed successfully.`);
    } catch (error) {
      console.error(`Error processing user ${tokenData.username}:`, error);
    }

    const redirectResponse = NextResponse.redirect(new URL('/', request.url))

    return redirectResponse
  }