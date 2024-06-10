/*
  Warnings:

  - You are about to drop the column `likeQuantity` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likeQuantity";
