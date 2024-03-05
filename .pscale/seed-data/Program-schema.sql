CREATE TABLE `Program` (
	`id` int NOT NULL AUTO_INCREMENT,
	`collegeId` int NOT NULL,
	`name` varchar(191) NOT NULL,
	`degreeType` enum('BA', 'BS', 'BFA', 'MA', 'MS', 'MBA', 'MFA', 'PhD', 'MD', 'JD', 'EdD', 'DDS', 'DVM', 'LLB', 'LLM', 'PsyD') NOT NULL,
	`department` varchar(191),
	PRIMARY KEY (`id`),
	KEY `Program_collegeId_degreeType_idx` (`collegeId`, `degreeType`),
	FULLTEXT KEY `Program_name_idx` (`name`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;