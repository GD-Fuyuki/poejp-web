'use client'

import { Button } from "@/components/ui/button";
import PoETestButton from "@/components/ui/PoETestButton";
import axios from "axios";
// import { cookies } from 'next/headers'

export default function OAuthTokenPage() {
  // const cookieStore = cookies()
  const redirectUri: any = process.env.OAUTH_REDIRECT_URI;
  const clientId: any = process.env.OAUTH_CLIENT_ID;
  const clientSecret: any = process.env.OAUTH_CLIENT_SECRET;
  // const code: any = cookieStore.get('code')?.value
  // const codeVerifier: any = cookieStore.get('code_verifier')?.value

  const submitData = async () => {
    console.log('use fetch API')
    let response = await fetch('https://www.pathofexile.com/oauth/token', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'client_id': clientId,
          'client_secret': clientSecret,
          'grant_type': 'authorization_code',
          // 'code': code,
          'redirect_uri': redirectUri,
          'scope': 'account:profile account:leagues account:stashes account:characters account:league_accounts',
          // 'code_verifier': codeVerifier
        })
    })

    response = await response.json()
    console.log('res:', response)
}

const submitaxi = async () => {
  const axi: any = await axios.post('https://www.pathofexile.com/oauth/token')
}

  return (
    <div>
        <PoETestButton/>
        <Button variant="secondary" onClick={submitData}>fetch API</Button>
    </div>
  );
}