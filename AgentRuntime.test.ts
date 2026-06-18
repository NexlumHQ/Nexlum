import { describe, it, expect, beforeEach } from 'vitest'
import { AgentRuntime } from '../../src/agents/AgentRuntime'
import { AgentBuilder } from '../../src/agents/AgentBuilder'

describe('AgentRuntime', () => {
  let runtime: AgentRuntime

  beforeEach(() => {
    runtime = new AgentRuntime()
  })

  it('should deploy an agent successfully', async () => {
    const config = AgentBuilder.create()
      .withObjective('Monitor ETH price and report daily')
      .withBudget(BigInt(100) * BigInt(10 ** 18))
      .withFrequency('daily')
      .build()

    const agent = await runtime.deployAgent('0xOwner', 'Price Monitor', config)
    
    expect(agent.id).toBeTruthy()
    expect(agent.name).toBe('Price Monitor')
    expect(agent.owner).toBe('0xOwner')
    expect(agent.status).toBe('active')
    expect(agent.executions).toBe(0)
  })

  it('should pause an agent', async () => {
    const config = AgentBuilder.create()
      .withObjective('Test agent')
      .withBudget(BigInt(10) * BigInt(10 ** 18))
      .build()

    const agent = await runtime.deployAgent('0xOwner', 'Test', config)
    await runtime.pauseAgent(agent.id)
    
    const updated = runtime.getAgent(agent.id)
    expect(updated?.status).toBe('paused')
  })

  it('should terminate an agent', async () => {
    const config = AgentBuilder.create()
      .withObjective('Test agent')
      .withBudget(BigInt(10) * BigInt(10 ** 18))
      .build()

    const agent = await runtime.deployAgent('0xOwner', 'Test', config)
    await runtime.terminateAgent(agent.id)
    
    const updated = runtime.getAgent(agent.id)
    expect(updated?.status).toBe('terminated')
  })

  it('should track executions', async () => {
    const config = AgentBuilder.create()
      .withObjective('Run once')
      .withBudget(BigInt(10) * BigInt(10 ** 18))
      .withFrequency('once')
      .build()

    const agent = await runtime.deployAgent('0xOwner', 'Once Agent', config)
    
    // Wait for execution
    await new Promise(r => setTimeout(r, 1500))
    
    const executions = runtime.getExecutions(agent.id)
    expect(executions.length).toBeGreaterThan(0)
  })

  it('should throw if agent not found', async () => {
    await expect(runtime.pauseAgent('nonexistent')).rejects.toThrow('not found')
  })
})
