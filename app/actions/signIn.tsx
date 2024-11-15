'use server'
import { signIn } from '../auth'
// Authentication import
export default async function signMeIn() {
  return signIn('auth0')
}

// TODO: Bug wenn factor generiert / editiert wird entstehen mehr faktoren im UI
