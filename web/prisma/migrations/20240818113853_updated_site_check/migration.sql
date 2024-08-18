/*
  Warnings:

  - You are about to drop the column `active` on the `SiteCheck` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SiteCheck" DROP COLUMN "active",
ADD COLUMN     "alive" BOOLEAN NOT NULL DEFAULT false;
