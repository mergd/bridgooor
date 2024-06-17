import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const networksTable = sqliteTable('networks', {
  id: integer('id').primaryKey(),
  logo_uri: text('logo_uri'),
  chain_id: integer('chain_id').notNull(),
  parent_chain_id: integer('parent_chain_id'),
  type: text('type').notNull(),
  native_currency: text('native_currency')
    .notNull()
    .references(() => tokensTable.id),
  name: text('name').notNull(),
  rpc: text('rpc').notNull(),
  ws: text('ws'),
  explorer: text('explorer').notNull(),
  file_optimism_contracts: text('file_optimism_contracts'),
  file_optimism_genesis: text('file_optimism_genesis'),
  file_optimism_rollup: text('file_optimism_rollup'),
  file_arbitrum_core: text('file_arbitrum_core'),
  file_arbitrum_chaininfo: text('file_arbitrum_chaininfo'),
  contracts: text('contracts').notNull(),
})

export const tokensTable = sqliteTable('tokens', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  symbol: text('symbol').notNull(),
  logo_uri: text('logo_uri'),
  decimals: integer('decimals').notNull(),
})

export const tokenDeployments = sqliteTable('deployments', {
  id: integer('id').primaryKey(),
  token_id: integer('token_id')
    .notNull()
    .references(() => tokensTable.id),
  chain_id: integer('chain_id')
    .notNull()
    .references(() => networksTable.chain_id),
  contract_address: text('contract_address').notNull(),
})

// export const tokenRelations = relations(tokensTable, ({ many }) => ({
//   deployments: many(tokenDeployments),
// }))

// export const bridgeTxRelations = relations(networksTable, ({ many }) => ({
//   tokens: many(bridgeTxTable),
// }))

export const bridgeTxTable = sqliteTable('bridge_tx', {
  id: integer('id').primaryKey(),
  bridge_type: text('bridgeType').notNull(),
  from_address: text('from_address').notNull(),
  to_address: text('to_address').notNull(),
  amount: text('amount').notNull(),
  token_address: text('token_address').notNull(),
  token_symbol: text('token_symbol').notNull(),
  token_decimals: text('token_decimals').notNull(),
  status: text('status').notNull(),
  created_at: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
  source_chain_id: integer('source_chain_id').notNull(),
  source_chain_tx_hash: text('source_chain_tx_hash').notNull(),
  dest_chain_id: integer('dest_chain_id').notNull(),
  dest_chain_tx_hash: text('dest_chain_tx_hash').notNull(),
})

export type InsertNetwork = typeof networksTable.$inferInsert
export type SelectNetwork = typeof networksTable.$inferSelect

export type InsertBridgeTx = typeof bridgeTxTable.$inferInsert
export type SelectBridgeTx = typeof bridgeTxTable.$inferSelect
