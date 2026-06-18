import { API_BASE } from '../lib/constants'
import type { Agent, MarketplaceListing, GovernanceProposal } from '../types'

class NexlumAPIClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      ...options,
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }))
      throw new Error(err.message ?? 'API request failed')
    }
    return res.json()
  }

  // ── Agents ──
  async getAgents(owner?: string): Promise<Agent[]> {
    const query = owner ? `?owner=${owner}` : ''
    return this.request<Agent[]>(`/v1/agents${query}`)
  }

  async getAgent(agentId: string): Promise<Agent> {
    return this.request<Agent>(`/v1/agents/${agentId}`)
  }

  // ── Marketplace ──
  async getListings(page = 1, limit = 20): Promise<MarketplaceListing[]> {
    return this.request<MarketplaceListing[]>(`/v1/marketplace?page=${page}&limit=${limit}`)
  }

  async getListing(listingId: string): Promise<MarketplaceListing> {
    return this.request<MarketplaceListing>(`/v1/marketplace/${listingId}`)
  }

  // ── Governance ──
  async getProposals(status?: string): Promise<GovernanceProposal[]> {
    const query = status ? `?status=${status}` : ''
    return this.request<GovernanceProposal[]>(`/v1/governance/proposals${query}`)
  }

  async getProposal(proposalId: string): Promise<GovernanceProposal> {
    return this.request<GovernanceProposal>(`/v1/governance/proposals/${proposalId}`)
  }

  // ── Analytics ──
  async getProtocolStats() {
    return this.request<{
      totalAgents: number
      activeAgents: number
      totalExecutions: number
      totalVolumeLUM: string
      uniqueUsers: number
    }>('/v1/stats')
  }
}

export const api = new NexlumAPIClient(API_BASE)
