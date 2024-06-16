import { useDeployment, useDeployments } from '@/app/hooks/useDeployment'
import { chainIcons } from '@/lib/utils'
import { WALLETCONNECT_PROJECT_ID } from '@/utils/web3'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { PropsWithChildren, useMemo } from 'react'
import { State, WagmiProvider, fallback, http } from 'wagmi'
import { optimismSepolia, sepolia, type Chain } from 'wagmi/chains'

interface Props extends PropsWithChildren {
  initialState?: State
}

const queryClient = new QueryClient()

export function Web3Provider(props: Props) {
  const deployments = useDeployments()
  const deployment = useDeployment()

  const config = useMemo(() => {
    const chains: Chain[] =
      deployments.length === 0
        ? [sepolia, optimismSepolia]
        : Object.values(
            deployments.reduce((accum, d) => {
              if (chainIcons[d.l1.id]) {
                // @ts-expect-error
                d.l1.iconUrl = chainIcons[d.l1.id]
              }
              if (chainIcons[d.l2.id]) {
                // @ts-expect-error
                d.l2.iconUrl = chainIcons[d.l2.id]
              }

              return {
                ...accum,
                [d.l1.id]: d.l1,
                [d.l2.id]: d.l2,
              }
            }, {})
          )
    const transports = chains.reduce(
      (accum, chain) => ({
        ...accum,
        [chain.id]: fallback(chain.rpcUrls.default.http.map((url) => http(url))),
      }),
      {}
    )

    return defaultWagmiConfig({
      appName: 'bridgooor',
      projectId: WALLETCONNECT_PROJECT_ID,
      // @ts-expect-error
      chains,
      transports,
      ssr: true,
    })
  }, [deployments])

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
