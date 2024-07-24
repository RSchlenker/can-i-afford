'use client'
import { useEffect, useState } from 'react'
import isAuthenticated from '../actions/authenticated'
import { SignIn } from './SignInButton'

export default function AuthenticationButton() {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuthenticated() {
      const status = await isAuthenticated()
      setAuthenticated(status)
    }
    checkAuthenticated()
  }, [])

  return (
    <div>
      {authenticated ? 'You are authenticated' : 'You are not authenticated'}
      <SignIn />
    </div>
  )
}
