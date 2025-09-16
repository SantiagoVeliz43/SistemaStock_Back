-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."Especiliad" AS ENUM ('CLINICO', 'CIRUJANO', 'PEDIATRA', 'PSQUIATRA');

-- CreateEnum
CREATE TYPE "public"."CategoriaProducto" AS ENUM ('INYECTABLE', 'JARABE', 'PILDORA', 'SUPOSITORIO', 'OVULO', 'CREMA', 'GOTA', 'SPRAYS');

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
CREATE TABLE "public"."ComputadoraGeneral" (
    "id_computadora" TEXT NOT NULL,
    "clave_ingresada" TEXT NOT NULL,
    "fecha_expedicion" TIMESTAMP(3) NOT NULL,
    "farmaceuticoCedula" INTEGER NOT NULL,
    "recetaNroReceta" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "ComputadoraGeneral_pkey" PRIMARY KEY ("id_computadora")
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
    "nro_receta" TEXT NOT NULL,
    "medicoCedula" INTEGER NOT NULL,
    "pacienteNroLegajo" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Recetas_pkey" PRIMARY KEY ("nro_receta")
);

-- CreateTable
CREATE TABLE "public"."RecetaProductos" (
    "id_receta_prod" SERIAL NOT NULL,
    "fecha_emision" TIMESTAMP(3) NOT NULL,
    "fecha_vencimiento" TIMESTAMP(3) NOT NULL,
    "dosificacion" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "recetaNroReceta" TEXT NOT NULL,
    "productoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "RecetaProductos_pkey" PRIMARY KEY ("id_receta_prod")
);

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
CREATE INDEX "ComputadoraGeneral_id_computadora_idx" ON "public"."ComputadoraGeneral"("id_computadora");

-- CreateIndex
CREATE INDEX "ComputadoraGeneral_clave_ingresada_idx" ON "public"."ComputadoraGeneral"("clave_ingresada");

-- CreateIndex
CREATE INDEX "Productos_id_idx" ON "public"."Productos"("id");

-- CreateIndex
CREATE INDEX "Recetas_nro_receta_idx" ON "public"."Recetas"("nro_receta");

-- CreateIndex
CREATE INDEX "RecetaProductos_id_receta_prod_idx" ON "public"."RecetaProductos"("id_receta_prod");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- CreateIndex
CREATE INDEX "Users_id_email_idx" ON "public"."Users"("id", "email");

-- AddForeignKey
ALTER TABLE "public"."ComputadoraGeneral" ADD CONSTRAINT "ComputadoraGeneral_farmaceuticoCedula_fkey" FOREIGN KEY ("farmaceuticoCedula") REFERENCES "public"."Farmaceuticos"("cedula_farma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ComputadoraGeneral" ADD CONSTRAINT "ComputadoraGeneral_recetaNroReceta_fkey" FOREIGN KEY ("recetaNroReceta") REFERENCES "public"."Recetas"("nro_receta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Recetas" ADD CONSTRAINT "Recetas_medicoCedula_fkey" FOREIGN KEY ("medicoCedula") REFERENCES "public"."Medicos"("cedula_med") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Recetas" ADD CONSTRAINT "Recetas_pacienteNroLegajo_fkey" FOREIGN KEY ("pacienteNroLegajo") REFERENCES "public"."Pacientes"("nro_legajo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecetaProductos" ADD CONSTRAINT "RecetaProductos_recetaNroReceta_fkey" FOREIGN KEY ("recetaNroReceta") REFERENCES "public"."Recetas"("nro_receta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecetaProductos" ADD CONSTRAINT "RecetaProductos_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "public"."Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
