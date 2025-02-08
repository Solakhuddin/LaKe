/*
  Warnings:

  - The primary key for the `income` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `income` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - You are about to alter the column `user_id` on the `income` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - The primary key for the `spend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `spend` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - You are about to alter the column `user_id` on the `spend` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `Int`.

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
ALTER TABLE `income` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `spend` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Spend` ADD CONSTRAINT `Spend_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
