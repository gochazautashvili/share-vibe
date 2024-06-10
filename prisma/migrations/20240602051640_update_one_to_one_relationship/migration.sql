/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - Made the column `postId` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "postId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_postId_key" ON "Image"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_postId_key" ON "Video"("postId");
