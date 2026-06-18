// ── Protocol Constants ──

export const NEXLUM_VERSION = '1.0.0'

export const CHAIN = {
  BASE_MAINNET: 8453,
  BASE_SEPOLIA: 84532,
} as const

export const CONTRACTS = {
  [CHAIN.BASE_MAINNET]: {
    LUM_TOKEN: '' as `0x${string}`,
    AGENT_REGISTRY: '' as `0x${string}`,
    MARKETPLACE: '' as `0x${string}`,
    NEXDAO: '' as `0x${string}`,
    TREASURY: '' as `0x${string}`,
    EXECUTION_NETWORK: '' as `0x${string}`,
  },
  [CHAIN.BASE_SEPOLIA]: {
    LUM_TOKEN: '' as `0x${string}`,
    AGENT_REGISTRY: '' as `0x${string}`,
    MARKETPLACE: '' as `0x${string}`,
    NEXDAO: '' as `0x${string}`,
    TREASURY: '' as `0x${string}`,
    EXECUTION_NETWORK: '' as `0x${string}`,
  },
} as const

export const TOKEN = {
  NAME: 'NEXLUM',
  SYMBOL: 'LUM',
  DECIMALS: 18,
  TOTAL_SUPPLY: BigInt('1000000000') * BigInt(10 ** 18),
} as const

export const PROTOCOL_FEES = {
  MARKETPLACE_FEE_BPS: 1000,    // 10%
  BURN_RATIO_BPS: 5000,         // 50% of fee is burned
  CREATOR_SHARE_BPS: 8500,      // 85% to creator
  NODE_SHARE_BPS: 500,          // 5% to node operators
} as const

export const GOVERNANCE = {
  PROPOSAL_THRESHOLD: BigInt('1000000') * BigInt(10 ** 18),
  QUORUM_BPS: 500,              // 5%
  VOTING_PERIOD: 7 * 24 * 3600, // 7 days in seconds
  TIMELOCK_DELAY: 48 * 3600,   // 48 hours
} as const

export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'https://api.nexlum.xyz'
export const WS_URL = import.meta.env.VITE_WS_URL ?? 'wss://ws.nexlum.xyz'
