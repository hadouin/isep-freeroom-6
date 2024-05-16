import { PrismaClient } from '@prisma/client';
import { ROOM_CONFIG } from '../src/lib/rooms-config';
import { getRoomCalendar } from '../src/lib/rooms';

// import userData from '$lib/data.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  Object.entries(ROOM_CONFIG).map(async ([roomId, roomConfig]) => {
    await prisma.room.create({
      data: {
        roomId,
        ...roomConfig,
        // resource: { roomId, title: roomConfig.title },
        event: { createMany: { data: await getRoomCalendar({ roomId, ...roomConfig }) } },
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
