import { describe, it, expect } from 'vitest'
import { AgentBuilder } from '../../src/agents/AgentBuilder'

describe('AgentBuilder', () => {
  it('should build a valid config', () => {
    const config = AgentBuilder.create()
      .withObjective('Monitor DeFi yields')
      .withBudget(BigInt(500) * BigInt(10 ** 18))
      .withFrequency('daily')
      .withMemory(true)
      .build()

    expect(config.objective).toBe('Monitor DeFi yields')
    expect(config.budget).toBe(BigInt(500) * BigInt(10 ** 18))
    expect(config.frequency).toBe('daily')
    expect(config.memoryEnabled).toBe(true)
  })

  it('should add triggers correctly', () => {
    const config = AgentBuilder.create()
      .withObjective('React to price movements')
      .withBudget(BigInt(100) * BigInt(10 ** 18))
      .onPriceAbove('0xETH', 4000)
      .build()

    expect(config.triggers).toHaveLength(1)
    expect(config.triggers[0].type).toBe('price')
  })

  it('should throw without objective', () => {
    expect(() =>
      AgentBuilder.create()
        .withBudget(BigInt(100) * BigInt(10 ** 18))
        .build()
    ).toThrow('objective is required')
  })

  it('should throw without budget', () => {
    expect(() =>
      AgentBuilder.create()
        .withObjective('No budget')
        .build()
    ).toThrow('budget is required')
  })
})
