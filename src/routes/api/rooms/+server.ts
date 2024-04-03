import { fetchRoomCalendarFromID } from '$lib/rooms';
import { ROOM_CONFIG } from '$lib/rooms-config';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch, params }) {
	try {
		// for each room, fetch the calendar
		const rooms = Object.entries(ROOM_CONFIG).map(([key, value]) => {
			return value;
		});

		const calendars: any[] = await Promise.all(
			rooms.map(async (room) => {
				const calendar = await fetchRoomCalendarFromID(room.id, fetch);
				return calendar.room;
			})
		);

		return json(calendars);
	} catch (e) {
		error(500, 'Could not retrieve the calendar for rooms');
	}
}
