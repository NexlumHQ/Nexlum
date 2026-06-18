import { useAccount, useBalance, useReadContract } from 'wagmi'
import { CONTRACTS, CHAIN, TOKEN } from '../lib/constants'
import { formatLUM } from '../lib/utils'

const LUM_ABI = [
  { name: 'balanceOf', type: 'function', inputs: [{ name: 'account', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { name: 'totalSupply', type: 'function', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  { name: 'allowance', type: 'function', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
] as const

export function useLUMBalance() {
  const { address } = useAccount()

  const { data: balance, isLoading, refetch } = useReadContract({
    address: CONTRACTS[CHAIN.BASE_MAINNET].LUM_TOKEN,
    abi: LUM_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 10_000 },
  })

  return {
    raw: balance ?? BigInt(0),
    formatted: balance ? formatLUM(balance) : '0',
    isLoading,
    refetch,
  }
}

export function useLUMPrice() {
  // Price oracle integration placeholder
  return { price: 0, change24h: 0, isLoading: false }
}
