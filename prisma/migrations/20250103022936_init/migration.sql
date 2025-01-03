/*
  Warnings:

  - You are about to drop the column `nombreZona` on the `Zona` table. All the data in the column will be lost.
  - Added the required column `descripcion` to the `Zona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Zona` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Zona" DROP COLUMN "nombreZona",
ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL;
