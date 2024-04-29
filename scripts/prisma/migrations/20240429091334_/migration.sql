/*
  Warnings:

  - You are about to alter the column `idUser` on the `inventory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `inventory` MODIFY `idUser` INTEGER NOT NULL;
