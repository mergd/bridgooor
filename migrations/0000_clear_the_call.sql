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
	`logo_uri` text,
	`chain_id` integer NOT NULL,
	`parent_chain_id` integer,
	`type` text NOT NULL,
	`native_currency` text NOT NULL,
	`name` text NOT NULL,
	`rpc` text NOT NULL,
	`ws` text,
	`explorer` text NOT NULL,
	`file_optimism_contracts` text,
	`file_optimism_genesis` text,
	`file_optimism_rollup` text,
	`file_arbitrum_core` text,
	`file_arbitrum_chaininfo` text,
	`contracts` text NOT NULL,
	FOREIGN KEY (`native_currency`) REFERENCES `tokens`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `deployments` (
	`id` integer PRIMARY KEY NOT NULL,
	`token_id` integer NOT NULL,
	`chain_id` integer NOT NULL,
	`contract_address` text NOT NULL,
	FOREIGN KEY (`token_id`) REFERENCES `tokens`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`chain_id`) REFERENCES `networks`(`chain_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tokens` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`symbol` text NOT NULL,
	`logo_uri` text,
	`decimals` integer NOT NULL
);
