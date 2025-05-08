-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_instructorId_fkey";

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
