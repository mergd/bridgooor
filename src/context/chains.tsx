'use server'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { Deployment } from '@/utils/types'
import { db } from '@/db'
import { ETH_CHAINS } from './Web3'
import { match, P } from 'ts-pattern'
import { defineChain } from 'viem'
import { tokenDeployments, tokensTable } from '@/db/models/Schema'

export default async function getChains(): Promise<Deployment> {
  const header = headers()

  const pathname = header.get('x-forwarded-path')
  // Get number after /bridge/[chainId]
  if (!pathname) {
    throw new Error('Not implemented')
  }

  const chainId = Number(pathname.split('/')[2])

  if (chainId === undefined) throw new Error('Invalid chainId')

  // Query database for deployment by chainId

  const network = await db.query.networksTable.findFirst({
    with: {
      chain_id: chainId,
    },
  })

  if (!network) throw new Error('Invalid chainId, or chain not supported yet')

  //  If network is an L1 revert – bridged chains should be L2s
  if (!network.parent_chain_id) throw new Error('ChainId is an L1')

  const _res = await db
    .select()
    .from(tokenDeployments)
    .leftJoin(tokensTable, eq(tokensTable.id, tokenDeployments.token_id))
    .where(eq(tokenDeployments.chain_id, network.parent_chain_id))
    .limit(1)
  const networkToken = _res[0]
  if (!networkToken.deployments || !networkToken.tokens) throw new Error('Invalid network token')

  const nativeCurrency = {
    name: networkToken.tokens.name,
    symbol: networkToken.tokens.symbol,
    decimals: networkToken.tokens.decimals,
    address: networkToken.deployments.contract_address,
  }

  //   var deployment: Partial<Deployment> = {}

  const _l2 = defineChain({
    id: network.chain_id,
    name: network.name,
    rpcUrls: {
      default: {
        http: [network.rpc],
      },
    },
    nativeCurrency: nativeCurrency,
  })

  const _l1 = ETH_CHAINS[network.parent_chain_id]
  if (!_l1) throw new Error('Invalid parent chain')

  const deployment: Deployment = {
    name: network.name,
    rpcUrl: network.rpc,
    chainId: network.chain_id,
    stack: network.type === 'OPTIMISM' ? 'optimism' : 'arbitrum',
    dbId: network.id,
    l1: _l1,
    l2: _l2,
  }

  return deployment
}
