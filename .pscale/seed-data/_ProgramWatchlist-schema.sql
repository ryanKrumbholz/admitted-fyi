CREATE TABLE `_ProgramWatchList` (
	`A` int NOT NULL,
	`B` varchar(191) NOT NULL,
	UNIQUE KEY `_ProgramWatchList_AB_unique` (`A`, `B`),
	KEY `_ProgramWatchList_B_index` (`B`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;