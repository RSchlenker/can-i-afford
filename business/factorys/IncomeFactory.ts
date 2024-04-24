import { Factor } from '@/business/SimulationEngine'
import { income } from '@/business/finances'

export enum FIELD_TYPES {
  STRING,
  NUMBER,
}

export interface FormField {
  type: FIELD_TYPES
  placeholder: string
  id: string
}

export interface FactorFactory {
  fields: Array<FormField>
  buildFactor(fields: object): Factor
}

export class IncomeFactory implements FactorFactory {
  fields: Array<FormField>

  constructor() {
    this.fields = [
      {
        type: FIELD_TYPES.STRING,
        placeholder: 'Name',
        id: 'name',
      },
      {
        type: FIELD_TYPES.NUMBER,
        placeholder: 'Value',
        id: 'value',
      },
    ]
  }

  buildFactor(fields: object): Factor {
    return {
      name: fields.name,
      factor: income(fields.value),
    }
  }
}
