import { useState, useEffect, useCallback } from 'react'
import type { Agent, AgentExecution } from '../types'
import { agentRuntime } from '../agents/AgentRuntime'

export function useAgent(agentId: string | null) {
  const [agent, setAgent] = useState<Agent | null>(null)
  const [executions, setExecutions] = useState<AgentExecution[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(() => {
    if (!agentId) return
    const a = agentRuntime.getAgent(agentId)
    setAgent(a ?? null)
    setExecutions(agentRuntime.getExecutions(agentId))
  }, [agentId])

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, 5000)
    return () => clearInterval(interval)
  }, [refresh])

  const pause = useCallback(async () => {
    if (!agentId) return
    setLoading(true)
    try {
      await agentRuntime.pauseAgent(agentId)
      refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [agentId, refresh])

  const terminate = useCallback(async () => {
    if (!agentId) return
    setLoading(true)
    try {
      await agentRuntime.terminateAgent(agentId)
      refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [agentId, refresh])

  return { agent, executions, loading, error, pause, terminate, refresh }
}

export function useAllAgents() {
  const [agents, setAgents] = useState<Agent[]>([])

  useEffect(() => {
    const refresh = () => setAgents(agentRuntime.getAllAgents())
    refresh()
    const interval = setInterval(refresh, 5000)
    return () => clearInterval(interval)
  }, [])

  return agents
}
