import type { AgentConfig, AgentTool, Trigger } from '../types'

interface BuilderStep {
  objective?: string
  tools?: AgentTool[]
  triggers?: Trigger[]
  budget?: bigint
  frequency?: AgentConfig['frequency']
  memoryEnabled?: boolean
}

export class AgentBuilder {
  private config: Partial<AgentConfig> = {}

  static create(): AgentBuilder {
    return new AgentBuilder()
  }

  withObjective(objective: string): this {
    this.config.objective = objective
    return this
  }

  withBudget(lumAmount: bigint): this {
    this.config.budget = lumAmount
    return this
  }

  withFrequency(frequency: AgentConfig['frequency']): this {
    this.config.frequency = frequency
    return this
  }

  withMemory(enabled = true): this {
    this.config.memoryEnabled = enabled
    return this
  }

  withTrigger(trigger: Trigger): this {
    if (!this.config.triggers) this.config.triggers = []
    this.config.triggers.push(trigger)
    return this
  }

  scheduledDaily(): this {
    return this.withFrequency('daily').withTrigger({
      type: 'schedule',
      condition: 'every 24 hours',
      params: { hour: 0, minute: 0 },
    })
  }

  onPriceAbove(tokenAddress: string, threshold: number): this {
    return this.withTrigger({
      type: 'price',
      condition: `price > ${threshold}`,
      params: { token: tokenAddress, threshold, direction: 'above' },
    })
  }

  onChainEvent(contract: string, eventName: string): this {
    return this.withTrigger({
      type: 'onChainEvent',
      condition: `${contract}::${eventName}`,
      params: { contract, eventName },
    })
  }

  build(): AgentConfig {
    if (!this.config.objective) throw new Error('Agent objective is required')
    if (!this.config.budget) throw new Error('Agent budget is required')

    return {
      objective: this.config.objective,
      triggers: this.config.triggers ?? [],
      outputHandlers: [],
      budget: this.config.budget,
      frequency: this.config.frequency ?? 'onTrigger',
      memoryEnabled: this.config.memoryEnabled ?? false,
    } as AgentConfig
  }
}
