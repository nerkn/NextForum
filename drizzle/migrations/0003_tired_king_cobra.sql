CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`Description` varchar(255) NOT NULL,
	`secret` tinyint DEFAULT 0,
	`archive` tinyint DEFAULT 0,
	`starred` tinyint DEFAULT 0,
	`selected` tinyint DEFAULT 0,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime NOT NULL,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `topics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255),
	`Description` varchar(255) NOT NULL,
	`secret` tinyint DEFAULT 0,
	`archive` tinyint DEFAULT 0,
	`topicType` varchar(100) DEFAULT 'chat',
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime NOT NULL,
	CONSTRAINT `topics_id` PRIMARY KEY(`id`)
);
