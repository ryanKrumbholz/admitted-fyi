CREATE TABLE `Stats` (
	`id` varchar(191) NOT NULL,
	`gpa` double,
	`degreeType` enum('BA', 'BS', 'BFA', 'MA', 'MS', 'MBA', 'MFA', 'PhD', 'MD', 'JD', 'EdD', 'DDS', 'DVM', 'LLB', 'LLM', 'PsyD'),
	`residency` enum('AMERICAN', 'INTERNATIONAL'),
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;