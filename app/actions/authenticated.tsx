'use server'
import { auth } from '../auth'

export default async function isAuthenticated() {
  const session = await auth()
  console.log(session)
  return !(!session || !session.user)
}
