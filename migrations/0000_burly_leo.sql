CREATE TABLE `bridge_tx` (
	`id` integer PRIMARY KEY NOT NULL,
	`bridgeType` text NOT NULL,
	`from_address` text NOT NULL,
	`to_address` text NOT NULL,
	`amount` text NOT NULL,
	`token_address` text NOT NULL,
	`token_symbol` text NOT NULL,
	`token_decimals` text NOT NULL,
	`status` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	`source_chain_id` integer NOT NULL,
	`source_chain_tx_hash` text NOT NULL,
	`dest_chain_id` integer NOT NULL,
	`dest_chain_tx_hash` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `networks` (
	`id` integer PRIMARY KEY NOT NULL,
	`chain_id` integer NOT NULL,
	`parent_chain_id` integer NOT NULL,
	`type` text NOT NULL,
	`native_currency` text NOT NULL,
	`name` text NOT NULL,
	`rpc` text NOT NULL,
	`ws` text NOT NULL,
	`explorer` text NOT NULL,
	`logo_url` text NOT NULL,
	`icon_url` text NOT NULL,
	`brand_color` text NOT NULL,
	`file_optimism_contracts` text NOT NULL,
	`file_optimism_genesis` text NOT NULL,
	`file_optimism_rollup` text NOT NULL,
	`file_arbitrum_core` text NOT NULL,
	`file_arbitrum_chaininfo` text NOT NULL,
	`contracts` text NOT NULL
);
