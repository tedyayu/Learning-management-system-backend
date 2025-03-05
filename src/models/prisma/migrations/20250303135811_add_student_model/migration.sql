-- CreateTable
CREATE TABLE "Instructor" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "instructorID" TEXT,
    "phone" TEXT,
    "gender" TEXT,
    "bio" TEXT,
    "expertise" TEXT,
    "profilePhotoURL" TEXT,
    "experience" INTEGER DEFAULT 0,
    "salary" DECIMAL(65,30),
    "isActive" BOOLEAN DEFAULT true,
    "hiredDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "address" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "website" TEXT,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_email_key" ON "Instructor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_instructorID_key" ON "Instructor"("instructorID");
