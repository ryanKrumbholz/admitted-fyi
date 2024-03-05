CREATE TABLE `Verification` (
	`id` varchar(191) NOT NULL,
	`verified` tinyint(1) NOT NULL,
	`imgUrl` varchar(191) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;