import { error, json, type RequestHandler } from '@sveltejs/kit';
import { getRoom } from '$lib/rooms';

// json doesn't support JS Date, so it is better to SSR the data in server load (+page.server.ts) which uses devalue
export const GET: RequestHandler = async ({ params }) => {
  if (!params.roomId) {
    error(400, 'roomId missing');
  }
  try {
    return json(await getRoom(params.roomId));
  } catch (e) {
    error(500, 'Could not retrieve the calendar for room');
  }
};
