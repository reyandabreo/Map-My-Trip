-- CreateTable
CREATE TABLE "TravelStory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "experience" TEXT NOT NULL,
    "tips" TEXT,
    "category" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "budget" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "images" TEXT[],
    "likes" INTEGER NOT NULL DEFAULT 0,
    "comments" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TravelStory_pkey" PRIMARY KEY ("id")
);
