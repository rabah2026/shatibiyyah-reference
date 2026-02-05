CREATE TABLE `chapters` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`orderIndex` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chapters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`verseNumber` int NOT NULL,
	`text` text NOT NULL,
	`fullText` text,
	`chapterId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `verses_id` PRIMARY KEY(`id`),
	CONSTRAINT `verses_verseNumber_unique` UNIQUE(`verseNumber`)
);
