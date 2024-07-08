CREATE TABLE `trackr_account_type` (
	`type` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `trackr_account` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text DEFAULT 'savings' NOT NULL,
	`investment_type` text,
	`balance` real DEFAULT 0 NOT NULL,
	`curr_value` real DEFAULT 0 NOT NULL,
	`is_default_acct` integer DEFAULT false,
	`as_of_date` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`bank_id` integer NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`type`) REFERENCES `trackr_account_type`(`type`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`investment_type`) REFERENCES `trackr_investment_type`(`type`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`bank_id`) REFERENCES `trackr_bank`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `trackr_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `trackr_bank` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	FOREIGN KEY (`type`) REFERENCES `trackr_account_type`(`type`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `trackr_category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	FOREIGN KEY (`type`) REFERENCES `trackr_category_type`(`type`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `trackr_category_type` (
	`type` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `trackr_equity_account` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`account_id` integer NOT NULL,
	`buy_price` real NOT NULL,
	`curr_price` real NOT NULL,
	`quantity` integer NOT NULL,
	`money_control_prefix` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `trackr_account`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `trackr_frequency_type` (
	`type` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `trackr_group_user` (
	`group_id` integer NOT NULL,
	`user_id` text NOT NULL,
	PRIMARY KEY(`group_id`, `user_id`),
	FOREIGN KEY (`group_id`) REFERENCES `trackr_group`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `trackr_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `trackr_group` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `trackr_investment_type` (
	`type` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `trackr_mf_account` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`account_id` integer NOT NULL,
	`is_sip` integer DEFAULT false,
	`nav` real NOT NULL,
	`units` real NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `trackr_account`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `trackr_recurring_txn` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`txn_id` integer NOT NULL,
	`is_recurring` integer DEFAULT false,
	`frequency` text,
	`start_date` integer,
	`end_date` integer,
	FOREIGN KEY (`txn_id`) REFERENCES `trackr_transaction`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`frequency`) REFERENCES `trackr_frequency_type`(`type`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `trackr_transaction` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`description` text,
	`type` text DEFAULT 'expense' NOT NULL,
	`amount` real DEFAULT 0 NOT NULL,
	`category_id` integer NOT NULL,
	`source_id` integer,
	`destination_id` integer,
	`group_id` integer,
	`user_id` text NOT NULL,
	FOREIGN KEY (`type`) REFERENCES `trackr_transaction_type`(`type`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `trackr_category`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`source_id`) REFERENCES `trackr_account`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`destination_id`) REFERENCES `trackr_account`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`group_id`) REFERENCES `trackr_group`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `trackr_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `trackr_transaction_type` (
	`type` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `trackr_user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(20),
	`emailVerified` integer DEFAULT CURRENT_TIMESTAMP,
	`image` text(255),
	`is_admin` integer DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX `account_unique_idx` ON `trackr_account` (`name`,`bank_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `account_type_idx` ON `trackr_account` (`type`);--> statement-breakpoint
CREATE UNIQUE INDEX `bank_unique_idx` ON `trackr_bank` (`name`,`type`);--> statement-breakpoint
CREATE UNIQUE INDEX `category_unique_idx` ON `trackr_category` (`name`,`type`);--> statement-breakpoint
CREATE INDEX `txn_type_idx` ON `trackr_transaction` (`type`);--> statement-breakpoint
CREATE INDEX `txn_category_idx` ON `trackr_transaction` (`category_id`);