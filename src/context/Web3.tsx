import { WALLETCONNECT_PROJECT_ID } from '@/utils/web3'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { PropsWithChildren, useEffect, useState } from 'react'
import { State, WagmiProvider, fallback, http } from 'wagmi'
import { optimismSepolia, sepolia, mainnet, zoraSepolia, baseSepolia, base, type Chain } from 'wagmi/chains'
import getChains from './chains'
import { Deployment } from '@/utils/types'
import { useToast } from '@/components/ui/use-toast'
interface Props extends PropsWithChildren {
  initialState?: State
}

const queryClient = new QueryClient()

export const ETH_CHAINS = [mainnet, base, zoraSepolia, baseSepolia, sepolia]

export function Web3Provider(props: Props) {
  const [deployment, setDeployment] = useState<Deployment | null>(null)
  const [chains, setChains] = useState<[Chain, ...Chain[]]>([optimismSepolia, sepolia])
  const { toast } = useToast()
  useEffect(() => {
    async function fetchDeployment() {
      try {
        const deploymentData = await getChains()
        setDeployment(deploymentData)
        setChains([deploymentData.l1, deploymentData.l2])
      } catch (error) {
        console.error('Error fetching deployment data:', error)
        toast({
          variant: 'destructive',
          title: 'Error fetching deployment data',
          description: String(error),
        })
      }
    }

    fetchDeployment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const config = defaultWagmiConfig({
    projectId: WALLETCONNECT_PROJECT_ID,
    chains: chains,
    metadata: {
      name: 'bridgooor',
      description: 'bridging for L2s',
      url: 'https://bridgooor.vercel.app',
      icons: [],
    },
    ssr: true,
    enableEmail: true,
  })

  createWeb3Modal({
    wagmiConfig: config,
    projectId: WALLETCONNECT_PROJECT_ID,
    enableAnalytics: false, // Optional - defaults to your Cloud configuration
    enableOnramp: true,
    defaultChain: deployment?.l1 as Chain,
  })
  return (
    <>
      <WagmiProvider config={config} initialState={props.initialState}>
        <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
