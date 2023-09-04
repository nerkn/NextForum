ALTER TABLE `popular` RENAME COLUMN `tablbe` TO `table`;--> statement-breakpoint
ALTER TABLE `popular` MODIFY COLUMN `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `popular` MODIFY COLUMN `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;