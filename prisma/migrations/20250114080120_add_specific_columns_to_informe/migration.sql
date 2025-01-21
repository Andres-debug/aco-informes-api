/*
  Warnings:

  - You are about to drop the column `referenciaId` on the `informe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `actividad` DROP FOREIGN KEY `actividad_informeId_fkey`;

-- DropForeignKey
ALTER TABLE `informe` DROP FOREIGN KEY `Informe_Distrito_fk`;

-- DropForeignKey
ALTER TABLE `informe` DROP FOREIGN KEY `informe_iglesiaId_fkey`;

-- DropForeignKey
ALTER TABLE `informe` DROP FOREIGN KEY `informe_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `informe` DROP FOREIGN KEY `informe_zonaId_fkey`;

-- DropIndex
DROP INDEX `Informe_Distrito_fk` ON `informe`;

-- AlterTable
ALTER TABLE `informe` DROP COLUMN `referenciaId`,
    ADD COLUMN `distritoId` INTEGER NULL,
    ADD COLUMN `iglesiaId` INTEGER NULL,
    ADD COLUMN `usuarioId` INTEGER NULL,
    ADD COLUMN `zonaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `informe` ADD CONSTRAINT `informe_zonaId_fkey` FOREIGN KEY (`zonaId`) REFERENCES `zona`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `informe` ADD CONSTRAINT `informe_distritoId_fkey` FOREIGN KEY (`distritoId`) REFERENCES `distrito`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `informe` ADD CONSTRAINT `informe_iglesiaId_fkey` FOREIGN KEY (`iglesiaId`) REFERENCES `iglesia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `informe` ADD CONSTRAINT `informe_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
