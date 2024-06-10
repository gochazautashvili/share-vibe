-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "postId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "postId" TEXT,
    "asset_id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "version_id" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "secure_url" TEXT NOT NULL,
    "playback_url" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "original_filename" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_id_key" ON "Video"("id");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
