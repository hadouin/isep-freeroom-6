import { PrismaClient } from '@prisma/client';
import { ROOM_CONFIG } from '../src/lib/rooms-config';
import { getRoomCalendar } from '../src/lib/rooms';

// import userData from '$lib/data.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function main() {
  Object.entries(ROOM_CONFIG).map(async ([roomId, roomConfig]) => {
    await prisma.room.create({
      data: {
        roomId,
        ...roomConfig,
        // resource: { roomId, title: roomConfig.title },
        events: { createMany: { data: await getRoomCalendar({ roomId, ...roomConfig }) } },
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
