import type { PlainEvent } from '$lib/events';
import { fetchRoomCalendarFromID, type RoomCalendar } from '$lib/rooms';
import { error, json } from '@sveltejs/kit';
import { isBefore, isSameDay, isWithinInterval } from 'date-fns';

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch, params }) {
	try {
		const roomResponse: RoomCalendar = await fetchRoomCalendarFromID(params.roomId, fetch);

		const room = {
			...roomResponse.room,
			status: roomStatus(new Date(), roomResponse.room?.events || []),
		};

		return json({ room, status: roomResponse.status });
	} catch (e) {
		error(500, 'Could not retrieve the calendar for room: ' + params.roomId);
	}
}

function roomStatus(
	date: Date,
	events: PlainEvent[]
): { free: boolean; currentEvent: PlainEvent | null } {
	const filtered = events
		.filter((e) => isSameDay(date, new Date(e.start)))
		.sort((a, b) => (a.start > b.start ? 1 : -1));

	for (const event of filtered) {
		const start = new Date(event.start);
		const end = new Date(event.end);
		if (isWithinInterval(date, { start, end })) {
			return { free: false, currentEvent: event };
		}

		if (isBefore(date, start)) {
			return { free: true, currentEvent: event };
		}
	}
	return { free: true, currentEvent: null };
}
