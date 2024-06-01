import type { PageServerLoad } from './$types';
import { getRoom } from '$lib/rooms';
import type { Room } from '@prisma/client';

export const load: PageServerLoad = async ({ params }) => {
  const { roomId } = params;

  const room: Room = await getRoom(roomId);
  return {
    title: 'Salle ' + roomId,
    room,
  };
};
