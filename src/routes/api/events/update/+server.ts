import { ROOM_CONFIG } from '$lib/rooms-config';
import { fetchRoomEvents } from '$lib/rooms';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async () => {
  // Much more efficient to delete and recreate all events (as long as they don't have relations)
  // than to create missing, update existing, and delete removed ones ONE BY ONE
  try {
    await prisma.$transaction([
      prisma.event.deleteMany(),
      prisma.event.createMany({
        data: await fetchAllRoomEvents(),
      }),
    ]);
  } catch (e) {
    console.error('Could not update events', e);
    error(500, 'Could not update events');
  }

  return json('success');
};

const fetchAllRoomEvents = async () =>
  (
    await Promise.all(
      Object.entries(ROOM_CONFIG).map(async ([roomId, roomConfig]) => await fetchRoomEvents({ roomId, ...roomConfig }))
    )
  ).flat();
