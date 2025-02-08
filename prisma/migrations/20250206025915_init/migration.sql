/*
  Warnings:

  - You are about to drop the column `user_id` on the `income` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `spend` table. All the data in the column will be lost.
  - Added the required column `username` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Spend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `income` DROP FOREIGN KEY `Income_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `spend` DROP FOREIGN KEY `Spend_user_id_fkey`;

-- DropIndex
DROP INDEX `Income_user_id_fkey` ON `income`;

-- DropIndex
DROP INDEX `Spend_user_id_fkey` ON `spend`;

-- AlterTable
ALTER TABLE `income` DROP COLUMN `user_id`,
    ADD COLUMN `username` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `spend` DROP COLUMN `user_id`,
    ADD COLUMN `username` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Spend` ADD CONSTRAINT `Spend_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
