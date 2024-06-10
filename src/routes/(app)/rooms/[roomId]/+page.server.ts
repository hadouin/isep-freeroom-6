import type { PageServerLoad } from './$types';
import { getRoom } from '$lib/rooms';

export const load: PageServerLoad = async ({ params }) => {
  // load function automatically invalidated and re-ran when params.roomId changes, loading just 500B of data
  return {
    title: 'Salle ' + params.roomId,
    room: await getRoom(params.roomId),
  };
};
