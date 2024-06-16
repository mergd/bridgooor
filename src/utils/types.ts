import { Address } from 'viem'
import { type Chain } from 'viem/chains'
// Addressmap of chainId to token
export type AddressMap = {
  [chainId: number]: Address[]
}

export interface Token {
  address: Address
  symbol: string
  decimals: number
  chainId?: number
}
export interface TokenMetadata extends Token {
  map?: AddressMap
  isTestnet: boolean
  symbol: string
  decimals: number
  name: string
  logoURI?: string
  cgID?: string
}

export interface Deployment {
  name: string
  rpcUrl: string
  chainId: number
  stack: 'optimism' | 'arbitrum' | 'mainnet'
  dbId: number
  l1: Chain
  l2: Chain
  logoUrl?: string
}

// type ChainT = {
//   id: number
//   nativeCurrency: Token
//   rpcUrls: [
//     {
//       default: { http?: string[] }
//     },
//   ]
//   testnet: boolean
// }

export interface OrbitBridgingContracts {
  adminProxy: Address
  bridge: Address
  inbox: Address
  l2customGateway: Address
  l2multicall: Address
  l2proxyAdmin: Address
  l2router: Address
  l2standardGateway: Address
  l2weth: Address
  l2wethGateway: Address
  l3customGateway: Address
  l3multicall: Address
  l3proxyAdmin: Address
  l3router: Address
  l3standardGateway: Address
  l3weth?: Address
  l3wethGateway?: Address
  outbox: Address
  rollup: Address
  sequencerInbox: Address
  utils: Address
}

export interface OPBridgingContracts {
  addressManager: Address
  bondManager: Address
  canonicalTransactionChain: Address
  l1CrossDomainMessenger: Address
  l1StandardBridge: Address
  l2OutputOracle: Address
  optimismPortal: Address
  stateCommitmentChain: Address
}
