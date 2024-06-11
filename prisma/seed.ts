import { PrismaClient } from '@prisma/client';
import { ROOM_CONFIG } from '$lib/rooms-config';
import { fetchRoomEvents } from '$lib/rooms';

const prisma = new PrismaClient();

async function main() {
  Object.entries(ROOM_CONFIG).map(async ([roomId, roomConfig]) => {
    // remove roomId from events
    const events = (await fetchRoomEvents({ roomId, ...roomConfig })).map(({ roomId: _, ...event }) => event);
    await prisma.room.create({
      data: {
        roomId,
        ...roomConfig,
        events: { createMany: { data: events } },
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
