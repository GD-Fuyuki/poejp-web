'use client';

import { useEffect, useState } from 'react'
import { getUser, slackRedirectURI } from '../api/slack'
import { getSessionUser, setSessionUser } from '../api/session'

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        (async () => {
            const params = new URLSearchParams(window.location.search)
            const code = params.get('code')
            if (code) {
                try {
                    const response = await getUser(code)
                    setSessionUser(response.data.access_token, response.data.user_id)
                    window.location.href = slackRedirectURI
                } catch (err) {
                    console.log(err)
                    setHasError(true)
                }
            } else {
                if (getSessionUser()) {
                    setIsAuthenticated(true)
                } else {
                    setHasError(true)
                }
            }
        })()
    }, [])

    return { isAuthenticated, hasError }
}