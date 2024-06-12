import type { LayoutServerLoad } from './$types';
import { getRooms } from '$lib/rooms';

export const load: LayoutServerLoad = async () => {
  // streamed rooms https://svelte.dev/blog/streaming-snapshots-sveltekit
  return {
    rooms: await getRooms(),
  };
};
