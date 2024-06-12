-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('WAITING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "status" "RoomStatus" NOT NULL DEFAULT 'WAITING';
