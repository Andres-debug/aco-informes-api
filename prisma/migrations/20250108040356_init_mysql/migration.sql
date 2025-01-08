-- CreateTable
CREATE TABLE `Zona` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Distrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreDistrito` VARCHAR(191) NOT NULL,
    `zonaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Iglesia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreIglesia` VARCHAR(191) NOT NULL,
    `distritoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL,
    `distritoId` INTEGER NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Informe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `periodoInicio` DATETIME(3) NOT NULL,
    `periodoFin` DATETIME(3) NOT NULL,
    `pastorId` INTEGER NOT NULL,
    `totalGastos` DOUBLE NOT NULL,
    `totalActividades` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actividad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `gastosTransporte` DOUBLE NOT NULL,
    `iglesiaId` INTEGER NOT NULL,
    `pastorId` INTEGER NOT NULL,
    `informeId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Distrito` ADD CONSTRAINT `Distrito_zonaId_fkey` FOREIGN KEY (`zonaId`) REFERENCES `Zona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Iglesia` ADD CONSTRAINT `Iglesia_distritoId_fkey` FOREIGN KEY (`distritoId`) REFERENCES `Distrito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_distritoId_fkey` FOREIGN KEY (`distritoId`) REFERENCES `Distrito`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Informe` ADD CONSTRAINT `Informe_pastorId_fkey` FOREIGN KEY (`pastorId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Actividad` ADD CONSTRAINT `Actividad_iglesiaId_fkey` FOREIGN KEY (`iglesiaId`) REFERENCES `Iglesia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Actividad` ADD CONSTRAINT `Actividad_pastorId_fkey` FOREIGN KEY (`pastorId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Actividad` ADD CONSTRAINT `Actividad_informeId_fkey` FOREIGN KEY (`informeId`) REFERENCES `Informe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
