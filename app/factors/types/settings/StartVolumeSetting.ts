import { Setting } from '@/business/SimulationEngine'
import { OpenAIToolCall } from '@langchain/core/messages'

export default class StartVolumeSetting {
  static toSetting(call: OpenAIToolCall): Setting {
    return {
      name: 'startVolume',
      value: call.args.amount,
    }
  }
}
