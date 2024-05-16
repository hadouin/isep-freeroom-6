import { fetchRoomCalendarFromID, type RoomCalendar } from '$lib/rooms';
import { ROOM_CONFIG } from '$lib/rooms-config';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch, url }) {
  try {
    const buildingFilter = url.searchParams.get('building');
    let rooms = Object.entries(ROOM_CONFIG);

    // filter rooms based on selected building
    if (buildingFilter) rooms = rooms.filter(([, room]) => room.building === buildingFilter);

    // for each room, fetch the calendar
    const calendars: PromiseSettledResult<RoomCalendar>[] = await Promise.allSettled(
      rooms.map(async ([roomID]): Promise<RoomCalendar> => fetchRoomCalendarFromID(roomID, fetch))
    );

    const successfulRooms = calendars
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<RoomCalendar>).value.room);

    return json(successfulRooms);
  } catch (e) {
    error(500, 'Could not retrieve the calendar for rooms');
  }
}
