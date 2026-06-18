import type { Agent, AgentExecution, AgentConfig } from '../types'
import { generateAgentId } from '../lib/utils'

export class AgentRuntime {
  private agents: Map<string, Agent> = new Map()
  private executions: Map<string, AgentExecution[]> = new Map()

  async deployAgent(
    owner: string,
    name: string,
    config: AgentConfig
  ): Promise<Agent> {
    const agent: Agent = {
      id: generateAgentId(),
      owner,
      name,
      description: config.objective,
      status: 'pending',
      createdAt: Math.floor(Date.now() / 1000),
      executions: 0,
      earnings: BigInt(0),
      reputation: 0,
      tools: [],
      config,
    }

    this.agents.set(agent.id, agent)
    this.executions.set(agent.id, [])

    await this.activateAgent(agent.id)
    return agent
  }

  async activateAgent(agentId: string): Promise<void> {
    const agent = this.agents.get(agentId)
    if (!agent) throw new Error(`Agent ${agentId} not found`)
    agent.status = 'active'
    this.scheduleExecution(agentId)
  }

  async pauseAgent(agentId: string): Promise<void> {
    const agent = this.agents.get(agentId)
    if (!agent) throw new Error(`Agent ${agentId} not found`)
    agent.status = 'paused'
  }

  async terminateAgent(agentId: string): Promise<void> {
    const agent = this.agents.get(agentId)
    if (!agent) throw new Error(`Agent ${agentId} not found`)
    agent.status = 'terminated'
  }

  private scheduleExecution(agentId: string): void {
    const agent = this.agents.get(agentId)
    if (!agent || agent.status !== 'active') return

    const intervals: Record<string, number> = {
      hourly: 3600_000,
      daily: 86400_000,
      once: 0,
      onTrigger: -1,
    }

    const interval = intervals[agent.config.frequency]
    if (interval > 0) {
      setTimeout(() => this.executeAgent(agentId), interval)
    } else if (interval === 0) {
      setTimeout(() => this.executeAgent(agentId), 100)
    }
  }

  async executeAgent(agentId: string): Promise<AgentExecution> {
    const agent = this.agents.get(agentId)
    if (!agent) throw new Error(`Agent ${agentId} not found`)

    const execution: AgentExecution = {
      id: `exec_${Date.now()}`,
      agentId,
      startedAt: Math.floor(Date.now() / 1000),
      completedAt: null,
      status: 'running',
      result: null,
      cost: BigInt(100) * BigInt(10 ** 18),
      proof: '',
    }

    const execList = this.executions.get(agentId) ?? []
    execList.push(execution)
    this.executions.set(agentId, execList)

    try {
      // Simulate execution
      await new Promise(r => setTimeout(r, 1000))
      execution.status = 'success'
      execution.completedAt = Math.floor(Date.now() / 1000)
      execution.proof = `0x${Math.random().toString(16).slice(2).padStart(64, '0')}`
      agent.executions++
      agent.earnings += execution.cost * BigInt(85) / BigInt(100)
    } catch (err) {
      execution.status = 'failed'
      execution.completedAt = Math.floor(Date.now() / 1000)
    }

    if (agent.config.frequency !== 'once' && agent.config.frequency !== 'onTrigger') {
      this.scheduleExecution(agentId)
    }

    return execution
  }

  getAgent(agentId: string): Agent | undefined {
    return this.agents.get(agentId)
  }

  getExecutions(agentId: string): AgentExecution[] {
    return this.executions.get(agentId) ?? []
  }

  getAllAgents(): Agent[] {
    return Array.from(this.agents.values())
  }
}

export const agentRuntime = new AgentRuntime()
