-- CreateEnum
CREATE TYPE "Building" AS ENUM ('NDC', 'NDL');

-- CreateEnum
CREATE TYPE "Floor" AS ENUM ('GROUND', 'FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "resourceIds" TEXT[],
    "title" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "roomId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomId" TEXT NOT NULL,
    "icalsecurise" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "building" "Building" NOT NULL,
    "floor" "Floor" NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE SET NULL ON UPDATE CASCADE;
