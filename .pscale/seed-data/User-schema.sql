CREATE TABLE `User` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191),
	`email` varchar(191),
	`emailVerified` datetime(3),
	`image` varchar(191),
	`resident` tinyint(1) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `User_email_key` (`email`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;