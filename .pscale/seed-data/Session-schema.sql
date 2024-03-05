CREATE TABLE `Session` (
	`id` varchar(191) NOT NULL,
	`sessionToken` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`expires` datetime(3) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
	KEY `Session_userId_idx` (`userId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;