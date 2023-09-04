CREATE TABLE `FriendRequest` (
	`id` int AUTO_INCREMENT NOT NULL,
	`creatorId` int,
	`receiverId` int,
	CONSTRAINT `FriendRequest_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`Description` varchar(255) NOT NULL,
	`secret` tinyint,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`filename` varchar(255) NOT NULL,
	`Description` varchar(255) NOT NULL,
	`app` varchar(255) NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `popular` (
	`id` int AUTO_INCREMENT NOT NULL,
	`table` varchar(255) NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `popular_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `role` (
	`id` int AUTO_INCREMENT NOT NULL,
	`Role` varchar(255) NOT NULL,
	CONSTRAINT `role_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Session` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sessionToken` varchar(250) NOT NULL,
	`expires` datetime NOT NULL,
	CONSTRAINT `Session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `IDX_4a257d2c9837248d70640b3e36` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`userId` int NOT NULL,
	`roleId` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_to_groups` (
	`user_id` int NOT NULL,
	`group_id` int NOT NULL,
	`description` varchar(20)
);
--> statement-breakpoint
CREATE INDEX `IDX_3ea8bcae76ff0b74bcc1340af8` ON `user_roles` (`userId`);--> statement-breakpoint
CREATE INDEX `IDX_03c65026fd376f26b31503d40` ON `user_roles` (`roleId`);--> statement-breakpoint
ALTER TABLE `FriendRequest` ADD CONSTRAINT `FriendRequest_creatorId_user_id_fk` FOREIGN KEY (`creatorId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `FriendRequest` ADD CONSTRAINT `FriendRequest_receiverId_user_id_fk` FOREIGN KEY (`receiverId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_roleId_role_id_fk` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_to_groups` ADD CONSTRAINT `user_to_groups_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_to_groups` ADD CONSTRAINT `user_to_groups_group_id_groups_id_fk` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE no action ON UPDATE no action;

INSERT INTO user (name, password, email) VALUES ('John Doe', 'johndoe123', 'john.doe@example.com');
INSERT INTO user (name, password, email) VALUES ('Jane Smith', 'pass1234', 'jane.smith@emailprovider.com');
INSERT INTO user (name, password, email) VALUES ('Michael Johnson', 'mikepass567', 'michaelj@example.net');
INSERT INTO user (name, password, email) VALUES ('Emily Brown', 'emily2023', 'emily.brown@example.org');
INSERT INTO user (name, password, email) VALUES ('David Wilson', 'dwilsonpwd', 'davidw@emailprovider.com');
INSERT INTO user (name, password, email) VALUES ('Sarah Martinez', 'sarahtopaz', 'sarah.m@example.net');
INSERT INTO user (name, password, email) VALUES ('Robert Taylor', 'rtaylorpass', 'robert.taylor@example.org');
INSERT INTO user (name, password, email) VALUES ('Amanda Clark', 'amanda5678', 'amanda.c@emailprovider.com');
INSERT INTO user (name, password, email) VALUES ('James Anderson', 'jamespwd2023', 'james.anderson@example.net');
INSERT INTO user (name, password, email) VALUES ('Jessica White', 'jesspass123', 'jessica.white@example.org');
INSERT INTO user (name, password, email) VALUES ('Christopher Lee', 'chris456pwd', 'chris.lee@emailprovider.com');
INSERT INTO user (name, password, email) VALUES ('Olivia Hall', 'olivia2023', 'olivia.hall@example.net');
INSERT INTO user (name, password, email) VALUES ('Matthew Davis', 'mattpass789', 'matthew.d@example.org');
INSERT INTO user (name, password, email) VALUES ('Sophia Allen', 'sophia567pwd', 'sophia.allen@emailprovider.com');
INSERT INTO user (name, password, email) VALUES ('William Young', 'william1234', 'william.young@example.net');
INSERT INTO user (name, password, email) VALUES ('Isabella Turner', 'isapass2023', 'isabella.turner@example.org');
INSERT INTO user (name, password, email) VALUES ('Ethan Martinez', 'ethanpwd567', 'ethan.m@emailprovider.com');
INSERT INTO user (name, password, email) VALUES ('Ava Rodriguez', 'ava456pass', 'ava.rodriguez@example.net');
INSERT INTO user (name, password, email) VALUES ('Alexander Harris', 'alexpwd2023', 'alex.harris@example.org');
INSERT INTO user (name, password, email) VALUES ('Mia Jackson', 'miajackson123', 'mia.jackson@emailprovider.com');

INSERT INTO groups (name, description, secret) VALUES ('Friendly Club', 'A group for making new friends', 0);
INSERT INTO groups (name, description, secret) VALUES ('Secret Society', 'A society with confidential matters', 1);
INSERT INTO groups (name, description, secret) VALUES ('Outdoor Enthusiasts', 'For those who love outdoor activities', 0);
INSERT INTO groups (name, description, secret) VALUES ('Tech Explorers', 'Exploring the world of technology', 0);
INSERT INTO groups (name, description, secret) VALUES ('Mystery Solvers', 'Solving mysteries and puzzles together', 1);
INSERT INTO groups (name, description, secret) VALUES ('Artistic Creators', 'Creating art and sharing creativity', 0);
INSERT INTO groups (name, description, secret) VALUES ('Bookworms United', 'For avid readers and book lovers', 0);
INSERT INTO groups (name, description, secret) VALUES ('Confidential Innovators', 'Innovating in secrecy', 1);
INSERT INTO groups (name, description, secret) VALUES ('Hikers Haven', 'Connecting hikers and nature enthusiasts', 0);
INSERT INTO groups (name, description, secret) VALUES ('Covert Adventurers', 'Adventures hidden from the world', 1);
INSERT INTO groups (name, description, secret) VALUES ('Community Artists', 'Artists supporting each other', 0);
INSERT INTO groups (name, description, secret) VALUES ('Code Breakers', 'Cracking codes and ciphers', 0);
INSERT INTO groups (name, description, secret) VALUES ('Riddle Masters', 'Creating and solving riddles', 1);
INSERT INTO groups (name, description, secret) VALUES ('Culinary Explorers', 'Exploring diverse cuisines together', 0);
INSERT INTO groups (name, description, secret) VALUES ('Stealth Gamers', 'Gamers who enjoy stealth games', 1);
INSERT INTO groups (name, description, secret) VALUES ('Crafty Crafters', 'Crafting and DIY projects', 0);
INSERT INTO groups (name, description, secret) VALUES ('Cryptic Investigators', 'Investigating cryptic phenomena', 0);
INSERT INTO groups (name, description, secret) VALUES ('Musical Collaborators', 'Collaborating on musical projects', 0);
INSERT INTO groups (name, description, secret) VALUES ('Undercover Detectives', 'Solving mysteries incognito', 1);
INSERT INTO groups (name, description, secret) VALUES ('Nature Sketchers', 'Sketching the beauty of nature', 0);
INSERT INTO groups (name, description, secret) VALUES ('Public Speakers Guild', 'Enhancing public speaking skills', 0);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);

INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);
INSERT INTO `user_to_groups` (`user_id`, `group_id`, `description`)
VALUES (round(rand()*21), 0+round(rand()*21), NULL);