/*
  Warnings:

  - Made the column `referenciaId` on table `informe` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `informe` DROP FOREIGN KEY `Informe_referenciaId_fkey`;

-- DropIndex
DROP INDEX `Informe_referenciaId_fkey` ON `informe`;

-- AlterTable
ALTER TABLE `informe` MODIFY `referenciaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `informe` ADD CONSTRAINT `informe_zonaId_fkey` FOREIGN KEY (`referenciaId`) REFERENCES `zona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `informe` ADD CONSTRAINT `informe_distritoId_fkey` FOREIGN KEY (`referenciaId`) REFERENCES `distrito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `informe` ADD CONSTRAINT `informe_iglesiaId_fkey` FOREIGN KEY (`referenciaId`) REFERENCES `iglesia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `informe` ADD CONSTRAINT `informe_usuarioId_fkey` FOREIGN KEY (`referenciaId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
