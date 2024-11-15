'use server'
import { auth } from '../auth'

//TODO: Validate the session token
export default async function isAuthenticated() {
  console.log(process.env.NODE_ENV)
  if (process.env.ENVIRONMENT === 'test') {
    return true
  }
  const session = await auth()
  console.log(session)
  return !(!session || !session.user)
}
