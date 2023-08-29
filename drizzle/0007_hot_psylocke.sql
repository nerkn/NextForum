CREATE TABLE `likes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`likee` int NOT NULL,
	`user` int NOT NULL,
	`app` varchar(255) NOT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	CONSTRAINT `likes_id` PRIMARY KEY(`id`)
);
