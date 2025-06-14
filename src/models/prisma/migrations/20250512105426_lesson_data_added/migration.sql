-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "duration" TEXT,
ADD COLUMN     "order" INTEGER,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "thumbnailUrl" TEXT,
ADD COLUMN     "videoDescription" TEXT,
ADD COLUMN     "videoDuration" TEXT,
ADD COLUMN     "videoTitle" TEXT,
ADD COLUMN     "youtubeUrl" TEXT;
