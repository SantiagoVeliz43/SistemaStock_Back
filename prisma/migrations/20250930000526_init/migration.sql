-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."Especiliad" AS ENUM ('CLINICO', 'CIRUJANO', 'PEDIATRA', 'PSQUIATRA');

-- CreateEnum
CREATE TYPE "public"."CategoriaProducto" AS ENUM ('INYECTABLE', 'JARABE', 'PILDORA', 'SUPOSITORIO', 'OVULO', 'CREMA', 'GOTA', 'SPRAYS');

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Medicos" (
    "cedula_med" INTEGER NOT NULL,
    "nombre" VARCHAR(15) NOT NULL,
    "apellido" VARCHAR(15) NOT NULL,
    "especialidad" "public"."Especiliad" NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Medicos_pkey" PRIMARY KEY ("cedula_med")
);

-- CreateTable
CREATE TABLE "public"."Pacientes" (
    "nro_legajo" INTEGER NOT NULL,
    "nombre" VARCHAR(15) NOT NULL,
    "apellido" VARCHAR(15) NOT NULL,
    "dni" INTEGER NOT NULL,
    "fechaNac" TIMESTAMP(3) NOT NULL,
    "telefono" VARCHAR(15),
    "obraSocial" VARCHAR(50) NOT NULL,
    "direccion" VARCHAR(50),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Pacientes_pkey" PRIMARY KEY ("nro_legajo")
);

-- CreateTable
CREATE TABLE "public"."Farmaceuticos" (
    "cedula_farma" INTEGER NOT NULL,
    "nombre" VARCHAR(15) NOT NULL,
    "apellido" VARCHAR(15) NOT NULL,
    "clave_acceso" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Farmaceuticos_pkey" PRIMARY KEY ("cedula_farma")
);

-- CreateTable
CREATE TABLE "public"."Productos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "categProd" "public"."CategoriaProducto" NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Recetas" (
    "nro_receta" SERIAL NOT NULL,
    "medicoCedula" INTEGER NOT NULL,
    "pacienteNroLegajo" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Recetas_pkey" PRIMARY KEY ("nro_receta")
);

-- CreateTable
CREATE TABLE "public"."Detalles de Recetas" (
    "id_detallesReceta" SERIAL NOT NULL,
    "indicaciones" TEXT NOT NULL,
    "fecha_emision" TIMESTAMP(3) NOT NULL,
    "fecha_vencimiento" TIMESTAMP(3) NOT NULL,
    "recetaNroReceta" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Detalles de Recetas_pkey" PRIMARY KEY ("id_detallesReceta")
);

-- CreateTable
CREATE TABLE "public"."Computadora General" (
    "id_computadora" INTEGER NOT NULL,
    "clave_ingresada" TEXT NOT NULL,
    "fecha_expen" TIMESTAMP(3) NOT NULL,
    "farmaceuticoCedula" INTEGER NOT NULL,
    "recetaNroReceta" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Computadora General_pkey" PRIMARY KEY ("id_computadora")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- CreateIndex
CREATE INDEX "Users_id_email_idx" ON "public"."Users"("id", "email");

-- CreateIndex
CREATE INDEX "Medicos_cedula_med_idx" ON "public"."Medicos"("cedula_med");

-- CreateIndex
CREATE UNIQUE INDEX "Pacientes_dni_key" ON "public"."Pacientes"("dni");

-- CreateIndex
CREATE INDEX "Pacientes_nro_legajo_idx" ON "public"."Pacientes"("nro_legajo");

-- CreateIndex
CREATE UNIQUE INDEX "Farmaceuticos_clave_acceso_key" ON "public"."Farmaceuticos"("clave_acceso");

-- CreateIndex
CREATE INDEX "Farmaceuticos_clave_acceso_idx" ON "public"."Farmaceuticos"("clave_acceso");

-- CreateIndex
CREATE INDEX "Productos_id_idx" ON "public"."Productos"("id");

-- CreateIndex
CREATE INDEX "Recetas_nro_receta_idx" ON "public"."Recetas"("nro_receta");

-- CreateIndex
CREATE INDEX "Detalles de Recetas_id_detallesReceta_idx" ON "public"."Detalles de Recetas"("id_detallesReceta");

-- CreateIndex
CREATE INDEX "Computadora General_id_computadora_idx" ON "public"."Computadora General"("id_computadora");

-- CreateIndex
CREATE INDEX "Computadora General_clave_ingresada_idx" ON "public"."Computadora General"("clave_ingresada");

-- AddForeignKey
ALTER TABLE "public"."Recetas" ADD CONSTRAINT "Recetas_medicoCedula_fkey" FOREIGN KEY ("medicoCedula") REFERENCES "public"."Medicos"("cedula_med") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Recetas" ADD CONSTRAINT "Recetas_pacienteNroLegajo_fkey" FOREIGN KEY ("pacienteNroLegajo") REFERENCES "public"."Pacientes"("nro_legajo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Detalles de Recetas" ADD CONSTRAINT "Detalles de Recetas_recetaNroReceta_fkey" FOREIGN KEY ("recetaNroReceta") REFERENCES "public"."Recetas"("nro_receta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Detalles de Recetas" ADD CONSTRAINT "Detalles de Recetas_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "public"."Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Computadora General" ADD CONSTRAINT "Computadora General_farmaceuticoCedula_fkey" FOREIGN KEY ("farmaceuticoCedula") REFERENCES "public"."Farmaceuticos"("cedula_farma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Computadora General" ADD CONSTRAINT "Computadora General_recetaNroReceta_fkey" FOREIGN KEY ("recetaNroReceta") REFERENCES "public"."Recetas"("nro_receta") ON DELETE RESTRICT ON UPDATE CASCADE;
