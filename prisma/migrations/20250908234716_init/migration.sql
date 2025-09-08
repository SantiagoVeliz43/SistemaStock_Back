-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."Especiliad" AS ENUM ('CLINICO', 'CIRUJANO', 'PEDIATRA', 'PSQUIATRA');

-- CreateTable
CREATE TABLE "public"."Medicos" (
    "cedula" INTEGER NOT NULL,
    "nombre" VARCHAR(15) NOT NULL,
    "apellido" VARCHAR(15) NOT NULL,
    "especialidad" "public"."Especiliad" NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Medicos_pkey" PRIMARY KEY ("cedula")
);

-- CreateTable
CREATE TABLE "public"."Pacientes" (
    "nro_legajo" INTEGER NOT NULL,
    "nombre" VARCHAR(15) NOT NULL,
    "apellido" VARCHAR(15) NOT NULL,
    "dni" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Pacientes_pkey" PRIMARY KEY ("nro_legajo")
);

-- CreateTable
CREATE TABLE "public"."Farmaceuticos" (
    "cedula" INTEGER NOT NULL,
    "nombre" VARCHAR(15) NOT NULL,
    "apellido" VARCHAR(15) NOT NULL,
    "clave_acceso" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Farmaceuticos_pkey" PRIMARY KEY ("cedula")
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
CREATE TABLE "public"."CategoriasProductos" (
    "id_cat" INTEGER NOT NULL,
    "categoriaName" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "CategoriasProductos_pkey" PRIMARY KEY ("id_cat")
);

-- CreateTable
CREATE TABLE "public"."Productos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "presentation" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecetaProductos" (
    "id_receta_prod" INTEGER NOT NULL,
    "fecha_emision" TIMESTAMP(3) NOT NULL,
    "fecha_vencimiento" TIMESTAMP(3) NOT NULL,
    "dosificacion" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "recetaNroReceta" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "RecetaProductos_pkey" PRIMARY KEY ("id_receta_prod")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Medicos_cedula_idx" ON "public"."Medicos"("cedula");

-- CreateIndex
CREATE INDEX "Pacientes_nro_legajo_idx" ON "public"."Pacientes"("nro_legajo");

-- CreateIndex
CREATE INDEX "Farmaceuticos_clave_acceso_idx" ON "public"."Farmaceuticos"("clave_acceso");

-- CreateIndex
CREATE INDEX "Recetas_nro_receta_idx" ON "public"."Recetas"("nro_receta");

-- CreateIndex
CREATE INDEX "ComputadoraGeneral_id_computadora_idx" ON "public"."ComputadoraGeneral"("id_computadora");

-- CreateIndex
CREATE INDEX "ComputadoraGeneral_clave_ingresada_idx" ON "public"."ComputadoraGeneral"("clave_ingresada");

-- CreateIndex
CREATE INDEX "CategoriasProductos_id_cat_idx" ON "public"."CategoriasProductos"("id_cat");

-- CreateIndex
CREATE INDEX "Productos_id_idx" ON "public"."Productos"("id");

-- CreateIndex
CREATE INDEX "RecetaProductos_id_receta_prod_idx" ON "public"."RecetaProductos"("id_receta_prod");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_id_email_idx" ON "public"."users"("id", "email");

-- AddForeignKey
ALTER TABLE "public"."Recetas" ADD CONSTRAINT "Recetas_medicoCedula_fkey" FOREIGN KEY ("medicoCedula") REFERENCES "public"."Medicos"("cedula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Recetas" ADD CONSTRAINT "Recetas_pacienteNroLegajo_fkey" FOREIGN KEY ("pacienteNroLegajo") REFERENCES "public"."Pacientes"("nro_legajo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ComputadoraGeneral" ADD CONSTRAINT "ComputadoraGeneral_farmaceuticoCedula_fkey" FOREIGN KEY ("farmaceuticoCedula") REFERENCES "public"."Farmaceuticos"("cedula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ComputadoraGeneral" ADD CONSTRAINT "ComputadoraGeneral_recetaNroReceta_fkey" FOREIGN KEY ("recetaNroReceta") REFERENCES "public"."Recetas"("nro_receta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Productos" ADD CONSTRAINT "Productos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."CategoriasProductos"("id_cat") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecetaProductos" ADD CONSTRAINT "RecetaProductos_recetaNroReceta_fkey" FOREIGN KEY ("recetaNroReceta") REFERENCES "public"."Recetas"("nro_receta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecetaProductos" ADD CONSTRAINT "RecetaProductos_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "public"."Productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
