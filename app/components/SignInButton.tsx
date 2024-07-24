'use client'
import signMeIn from '../actions/signIn'

export function SignIn() {
  const loginUser = () => {
    signMeIn()
  }
  return (
    <button onClick={loginUser} type="submit">
      Signin with Auth0
    </button>
  )
}
