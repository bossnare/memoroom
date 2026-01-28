/*
  Warnings:

  - You are about to drop the `_NoteTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_NoteTags" DROP CONSTRAINT "_NoteTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_NoteTags" DROP CONSTRAINT "_NoteTags_B_fkey";

-- DropTable
DROP TABLE "_NoteTags";

-- DropTable
DROP TABLE "tags";
