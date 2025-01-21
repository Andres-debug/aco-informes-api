-- AddForeignKey
ALTER TABLE `actividad` ADD CONSTRAINT `actividad_informeId_fkey` FOREIGN KEY (`informeId`) REFERENCES `informe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
