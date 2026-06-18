// ── NEXLUM Smart Contract ABIs ──

export const LUM_TOKEN_ABI = [
  { name: 'name', type: 'function', inputs: [], outputs: [{ type: 'string' }], stateMutability: 'view' },
  { name: 'symbol', type: 'function', inputs: [], outputs: [{ type: 'string' }], stateMutability: 'view' },
  { name: 'decimals', type: 'function', inputs: [], outputs: [{ type: 'uint8' }], stateMutability: 'view' },
  { name: 'totalSupply', type: 'function', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { name: 'balanceOf', type: 'function', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { name: 'allowance', type: 'function', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { name: 'approve', type: 'function', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }], stateMutability: 'nonpayable' },
  { name: 'transfer', type: 'function', inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }], stateMutability: 'nonpayable' },
  { name: 'transferFrom', type: 'function', inputs: [{ name: 'from', type: 'address' }, { name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ type: 'bool' }], stateMutability: 'nonpayable' },
  { name: 'Transfer', type: 'event', inputs: [{ name: 'from', type: 'address', indexed: true }, { name: 'to', type: 'address', indexed: true }, { name: 'value', type: 'uint256' }] },
  { name: 'Approval', type: 'event', inputs: [{ name: 'owner', type: 'address', indexed: true }, { name: 'spender', type: 'address', indexed: true }, { name: 'value', type: 'uint256' }] },
] as const

export const AGENT_REGISTRY_ABI = [
  { name: 'deployAgent', type: 'function', inputs: [{ name: 'configHash', type: 'bytes32' }, { name: 'budget', type: 'uint256' }], outputs: [{ name: 'agentId', type: 'bytes32' }], stateMutability: 'nonpayable' },
  { name: 'pauseAgent', type: 'function', inputs: [{ name: 'agentId', type: 'bytes32' }], outputs: [], stateMutability: 'nonpayable' },
  { name: 'terminateAgent', type: 'function', inputs: [{ name: 'agentId', type: 'bytes32' }], outputs: [], stateMutability: 'nonpayable' },
  { name: 'getAgent', type: 'function', inputs: [{ name: 'agentId', type: 'bytes32' }], outputs: [{ name: 'owner', type: 'address' }, { name: 'configHash', type: 'bytes32' }, { name: 'status', type: 'uint8' }, { name: 'budget', type: 'uint256' }, { name: 'executions', type: 'uint256' }], stateMutability: 'view' },
  { name: 'AgentDeployed', type: 'event', inputs: [{ name: 'agentId', type: 'bytes32', indexed: true }, { name: 'owner', type: 'address', indexed: true }, { name: 'configHash', type: 'bytes32' }] },
  { name: 'AgentPaused', type: 'event', inputs: [{ name: 'agentId', type: 'bytes32', indexed: true }] },
  { name: 'AgentTerminated', type: 'event', inputs: [{ name: 'agentId', type: 'bytes32', indexed: true }] },
] as const

export const MARKETPLACE_ABI = [
  { name: 'listAgent', type: 'function', inputs: [{ name: 'agentId', type: 'bytes32' }, { name: 'pricePerCall', type: 'uint256' }], outputs: [{ name: 'listingId', type: 'bytes32' }], stateMutability: 'nonpayable' },
  { name: 'executeAgent', type: 'function', inputs: [{ name: 'listingId', type: 'bytes32' }, { name: 'inputData', type: 'bytes' }], outputs: [{ name: 'executionId', type: 'bytes32' }], stateMutability: 'nonpayable' },
  { name: 'claimEarnings', type: 'function', inputs: [], outputs: [], stateMutability: 'nonpayable' },
  { name: 'earnings', type: 'function', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
] as const
