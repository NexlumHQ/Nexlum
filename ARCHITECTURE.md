# NEXLUM Architecture

## Overview

NEXLUM is a dual-pillar protocol built on BASE.

## Layers

### L1 — Settlement (BASE)
Final transaction settlement and token state.

### L2 — Execution (Agent Runtime)
Off-chain AI computation with on-chain proofs.

### L3 — Coordination (NexBridge)
Cross-chain agent messaging and liquidity routing.

### L4 — Application
Marketplace, LumLens Analytics, NexDAO Governance.

## Agent Lifecycle

```
Deploy → Activate → Execute → Settle → (Repeat | Terminate)
```

## Security Model

- Smart contract audits before mainnet
- Node operator staking + slashing
- 48-hour governance timelock
- 5-of-9 multi-sig treasury
