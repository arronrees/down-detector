/*
  Warnings:

  - Added the required column `url` to the `SiteCheck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SiteCheck" ADD COLUMN     "url" TEXT NOT NULL;
