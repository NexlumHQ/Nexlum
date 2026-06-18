import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatUnits, parseUnits } from 'viem'
import { TOKEN } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatLUM(amount: bigint, decimals = 2): string {
  const formatted = formatUnits(amount, TOKEN.DECIMALS)
  const num = parseFloat(formatted)
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(decimals)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(decimals)}K`
  return num.toFixed(decimals)
}

export function parseLUM(amount: string): bigint {
  return parseUnits(amount, TOKEN.DECIMALS)
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export function formatTimestamp(timestamp: number): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(timestamp * 1000))
}

export function timeRemaining(endTime: number): string {
  const now = Math.floor(Date.now() / 1000)
  const diff = endTime - now
  if (diff <= 0) return 'Ended'
  const days = Math.floor(diff / 86400)
  const hours = Math.floor((diff % 86400) / 3600)
  if (days > 0) return `${days}d ${hours}h remaining`
  return `${hours}h remaining`
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function generateAgentId(): string {
  return `agent_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}
