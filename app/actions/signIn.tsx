'use server'
import { signIn } from '../auth'

export default async function signMeIn() {
  return signIn('auth0')
}
