/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'DEV');

-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "jsonContent" JSONB;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "profiles"("username");
