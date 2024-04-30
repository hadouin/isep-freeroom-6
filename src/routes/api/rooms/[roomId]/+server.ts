import type { PlainEvent } from '$lib/events';
import { fetchRoomCalendarFromID, type Room, type RoomCalendar } from '$lib/rooms';
import { json } from '@sveltejs/kit';
import { isBefore, isSameDay, isWithinInterval } from 'date-fns';

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch, params }) {
	const roomResponse: RoomCalendar = await fetchRoomCalendarFromID(params.roomId, fetch);

	if (!roomResponse.room) return json(roomResponse);

	const room: Room = {
		...roomResponse.room,
		availability: roomStatus(new Date(), roomResponse.room?.events || []),
	};

	return json({ room, status: roomResponse.status });
}

function roomStatus(
	date: Date,
	events: PlainEvent[]
): { isFree: boolean; currentEvent?: PlainEvent } {
	const filtered = events
		.filter((e) => isSameDay(date, new Date(e.start)))
		.sort((a, b) => (a.start > b.start ? 1 : -1));

	for (const event of filtered) {
		const start = new Date(event.start);
		const end = new Date(event.end);
		if (isWithinInterval(date, { start, end })) {
			return { isFree: false, currentEvent: event };
		}

		if (isBefore(date, start)) {
			return { isFree: true, currentEvent: event };
		}
	}
	return { isFree: true };
}
