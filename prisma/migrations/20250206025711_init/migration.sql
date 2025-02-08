-- DropForeignKey
ALTER TABLE `income` DROP FOREIGN KEY `Income_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `spend` DROP FOREIGN KEY `Spend_user_id_fkey`;

-- DropIndex
DROP INDEX `Income_user_id_fkey` ON `income`;

-- DropIndex
DROP INDEX `Spend_user_id_fkey` ON `spend`;

-- AlterTable
ALTER TABLE `income` MODIFY `user_id` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `spend` MODIFY `user_id` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Spend` ADD CONSTRAINT `Spend_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
