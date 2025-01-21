/*
  Warnings:

  - You are about to drop the column `pastorId` on the `informe` table. All the data in the column will be lost.
  - Added the required column `tipoInforme` to the `informe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `informe` DROP FOREIGN KEY `Informe_pastorId_fkey`;

-- DropIndex
DROP INDEX `Informe_pastorId_fkey` ON `informe`;

-- AlterTable
ALTER TABLE `informe` DROP COLUMN `pastorId`,
    ADD COLUMN `referenciaId` INTEGER NULL,
    ADD COLUMN `tipoInforme` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `informe` ADD CONSTRAINT `Informe_referenciaId_fkey` FOREIGN KEY (`referenciaId`) REFERENCES `usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
