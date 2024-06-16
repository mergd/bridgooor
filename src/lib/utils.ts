import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  arbitrum,
  arbitrumNova,
  arbitrumSepolia,
  base,
  baseSepolia,
  bsc,
  bscTestnet,
  holesky,
  kroma,
  mainnet,
  mode,
  modeTestnet,
  optimism,
  optimismSepolia,
  pgn,
  rollux,
  sepolia,
  syscoin,
  zora,
  zoraSepolia,
} from 'viem/chains'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const chainIcons: { [chainId: number]: string | undefined } = {
  [mainnet.id]: '@/assets/networks/ethereum/network.svg',
  [sepolia.id]: '@/assets/networks/sepolia/network.svg',
  [holesky.id]: '@/assets/networks/holesky/network.png',
  [arbitrumSepolia.id]: '@/assets/networks/arbitrum-one/network.svg',
  [arbitrum.id]: '@/assets/networks/arbitrum-one/network.svg',
  [arbitrumNova.id]: '@/assets/networks/arbitrum-nova/network.svg',
  [rollux.id]: '@/assets/networks/rollux/network.svg',
  [788988]: '@/assets/networks/orb3-mainnet/network.svg',
  [pgn.id]: '@/assets/networks/pgn/network.svg',
  [kroma.id]: '@/assets/networks/kroma/network.svg',
  [1024]: '@/assets/networks/parallel/network.svg',
  [mode.id]: '@/assets/networks/mode/network.svg',
  [modeTestnet.id]: '@/assets/networks/mode/network.svg',
  [zora.id]: '@/assets/networks/zora/network.svg',
  [zoraSepolia.id]: '@/assets/networks/zora/network.svg',
  [base.id]: '@/assets/networks/base/network.svg',
  [baseSepolia.id]: '@/assets/networks/base/network.svg',
  [optimism.id]: '@/assets/networks/optimism/network.svg',
  [optimismSepolia.id]: '@/assets/networks/optimism/network.svg',
  [bsc.id]: '@/assets/networks/bsc/network.png',
  [bscTestnet.id]: '@/assets/networks/bsc/network.png',
}
