/*
  Warnings:

  - You are about to drop the column `fecha_expedicion` on the `Computadora General` table. All the data in the column will be lost.
  - Added the required column `fecha_expen` to the `Computadora General` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Computadora General" DROP COLUMN "fecha_expedicion",
ADD COLUMN     "fecha_expen" TIMESTAMP(3) NOT NULL;
