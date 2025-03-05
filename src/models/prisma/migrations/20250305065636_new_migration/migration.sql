/*
  Warnings:

  - Made the column `updatedAt` on table `Instructor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instructorId` on table `Instructor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Instructor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentId` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Instructor" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "instructorId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "studentId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;
