-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "comments" TEXT,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ReservationToRoom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReservationToRoom_AB_unique" ON "_ReservationToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_ReservationToRoom_B_index" ON "_ReservationToRoom"("B");

-- AddForeignKey
ALTER TABLE "_ReservationToRoom" ADD CONSTRAINT "_ReservationToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReservationToRoom" ADD CONSTRAINT "_ReservationToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("roomId") ON DELETE CASCADE ON UPDATE CASCADE;
