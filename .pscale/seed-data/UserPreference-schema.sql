CREATE TABLE `UserPreference` (
	`id` int NOT NULL AUTO_INCREMENT,
	`userId` varchar(191) NOT NULL,
	`preferenceType` varchar(191) NOT NULL,
	`preferenceValue` varchar(191) NOT NULL,
	PRIMARY KEY (`id`),
	KEY `UserPreference_userId_idx` (`userId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;