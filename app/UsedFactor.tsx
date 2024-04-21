import { Factor } from '@/business/SimulationEngine'

export default function UsedFactor({ factor }: { factor: Factor }) {
  return <div key={factor.id}>{factor.name}</div>
}
