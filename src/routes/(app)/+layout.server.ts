import type { LayoutServerLoad } from './$types';
import { getRooms } from '$lib/rooms';

export const load: LayoutServerLoad = async () => {
  return {
    rooms: await getRooms(),
  };
};
