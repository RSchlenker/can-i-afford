import { monthlyIncome } from 'affordable/src/finances'
import { multipleYears } from 'affordable/src/future'

export const metadata = {
  title: 'Can I afford',
}

export default function Page() {
  const test = multipleYears([monthlyIncome(2000)], 2022, 3, 0)
  console.log(test)
  return <h1>Can I afford</h1>
}
