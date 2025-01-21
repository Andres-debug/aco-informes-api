-- DropForeignKey
ALTER TABLE `informe` DROP FOREIGN KEY `informe_distritoId_fkey`;

-- AddForeignKey
ALTER TABLE `informe` ADD CONSTRAINT `Informe_Distrito_fk` FOREIGN KEY (`referenciaId`) REFERENCES `distrito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `actividad` RENAME INDEX `actividad_informeId_fkey` TO `Actividad_informeId_fkey`;
