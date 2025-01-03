-- CreateTable
CREATE TABLE "Zona" (
    "id" SERIAL NOT NULL,
    "nombreZona" TEXT NOT NULL,

    CONSTRAINT "Zona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distrito" (
    "id" SERIAL NOT NULL,
    "nombreDistrito" TEXT NOT NULL,
    "zonaId" INTEGER NOT NULL,

    CONSTRAINT "Distrito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Iglesia" (
    "id" SERIAL NOT NULL,
    "nombreIglesia" TEXT NOT NULL,
    "distritoId" INTEGER NOT NULL,

    CONSTRAINT "Iglesia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "distritoId" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Informe" (
    "id" SERIAL NOT NULL,
    "actividad" TEXT NOT NULL,
    "gastosTransporte" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "iglesiaId" INTEGER NOT NULL,
    "pastorId" INTEGER NOT NULL,

    CONSTRAINT "Informe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Distrito" ADD CONSTRAINT "Distrito_zonaId_fkey" FOREIGN KEY ("zonaId") REFERENCES "Zona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Iglesia" ADD CONSTRAINT "Iglesia_distritoId_fkey" FOREIGN KEY ("distritoId") REFERENCES "Distrito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_distritoId_fkey" FOREIGN KEY ("distritoId") REFERENCES "Distrito"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Informe" ADD CONSTRAINT "Informe_iglesiaId_fkey" FOREIGN KEY ("iglesiaId") REFERENCES "Iglesia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Informe" ADD CONSTRAINT "Informe_pastorId_fkey" FOREIGN KEY ("pastorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
