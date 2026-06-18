// ── NEXLUM Core Types ──

export interface Agent {
  id: string
  owner: string
  name: string
  description: string
  status: AgentStatus
  createdAt: number
  executions: number
  earnings: bigint
  reputation: number
  tools: AgentTool[]
  config: AgentConfig
}

export type AgentStatus = 'active' | 'paused' | 'terminated' | 'pending'

export interface AgentTool {
  id: string
  name: string
  description: string
  permissions: string[]
}

export interface AgentConfig {
  objective: string
  triggers: Trigger[]
  budget: bigint
  frequency: 'once' | 'hourly' | 'daily' | 'onTrigger'
  memoryEnabled: boolean
}

export interface Trigger {
  type: 'schedule' | 'onChainEvent' | 'price' | 'webhook'
  condition: string
  params: Record<string, unknown>
}

export interface AgentExecution {
  id: string
  agentId: string
  startedAt: number
  completedAt: number | null
  status: 'running' | 'success' | 'failed'
  result: string | null
  cost: bigint
  proof: string
}

export interface MarketplaceListing {
  id: string
  agentId: string
  seller: string
  pricePerCall: bigint
  reputation: number
  totalSales: number
}

export interface GovernanceProposal {
  id: string
  proposer: string
  title: string
  description: string
  status: 'pending' | 'active' | 'passed' | 'failed' | 'executed'
  forVotes: bigint
  againstVotes: bigint
  startTime: number
  endTime: number
}

export interface UserStats {
  address: string
  agentsDeployed: number
  totalEarnings: bigint
  lumBalance: bigint
  lumStaked: bigint
  governancePower: bigint
}
