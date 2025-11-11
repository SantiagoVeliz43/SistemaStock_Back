-- DropIndex
DROP INDEX "public"."Farmaceuticos_clave_acceso_key";

-- AlterTable
ALTER TABLE "Farmaceuticos" ALTER COLUMN "clave_acceso" SET DATA TYPE TEXT;
