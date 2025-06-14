/*
  Warnings:

  - You are about to drop the column `courseId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `pdfUrl` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Quiz` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_courseId_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "courseId",
DROP COLUMN "description",
DROP COLUMN "isPublished",
DROP COLUMN "pdfUrl",
DROP COLUMN "videoUrl";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "courseId";

-- CreateTable
CREATE TABLE "_LessonToQuiz" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LessonToQuiz_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_LessonToQuiz_B_index" ON "_LessonToQuiz"("B");

-- AddForeignKey
ALTER TABLE "_LessonToQuiz" ADD CONSTRAINT "_LessonToQuiz_A_fkey" FOREIGN KEY ("A") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonToQuiz" ADD CONSTRAINT "_LessonToQuiz_B_fkey" FOREIGN KEY ("B") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
