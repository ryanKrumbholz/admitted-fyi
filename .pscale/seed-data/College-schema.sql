CREATE TABLE `College` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(191) NOT NULL,
	`url` varchar(191),
	PRIMARY KEY (`id`),
	FULLTEXT KEY `College_name_idx` (`name`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;