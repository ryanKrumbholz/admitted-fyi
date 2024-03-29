CREATE TABLE `Account` (
	`id` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`type` varchar(191) NOT NULL,
	`provider` varchar(191) NOT NULL,
	`providerAccountId` varchar(191) NOT NULL,
	`refresh_token` varchar(2000),
	`refresh_token_expires_in` int,
	`access_token` varchar(2000),
	`expires_at` int,
	`token_type` varchar(191),
	`scope` varchar(191),
	`id_token` varchar(2000),
	`session_state` varchar(2000),
	`oauth_token_secret` varchar(2000),
	`oauth_token` varchar(2000),
	PRIMARY KEY (`id`),
	UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`, `providerAccountId`),
	UNIQUE KEY `Account_userId_key` (`userId`),
	KEY `Account_userId_idx` (`userId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;