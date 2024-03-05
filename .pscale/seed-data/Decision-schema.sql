CREATE TABLE `Decision` (
	`id` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`programId` int NOT NULL,
	`status` enum('WAITLISTED', 'INTERVIEW', 'ACCEPTED', 'REJECTED') NOT NULL,
	`date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
	`verificationId` varchar(191) NOT NULL,
	`collegeId` int NOT NULL,
	`statsId` varchar(191) NOT NULL,
	`term` enum('FALL', 'WINTER', 'SPRING', 'SUMMER') NOT NULL,
	`termYearString` varchar(191) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `Decision_verificationId_key` (`verificationId`),
	UNIQUE KEY `Decision_statsId_key` (`statsId`),
	KEY `Decision_userId_collegeId_programId_statsId_verificationId_idx` (`userId`, `collegeId`, `programId`, `statsId`, `verificationId`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;