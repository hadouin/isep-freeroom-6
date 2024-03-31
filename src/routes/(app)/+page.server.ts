import type { Event, PlainEvent } from '$lib/events';
import { fetchRoomCalendarFromID } from '$lib/rooms';
import { ROOM_CONFIG } from '$lib/rooms-config';
import { isBefore, isSameDay, isWithinInterval } from 'date-fns';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }: { fetch: Function }) {
	// for each room in ROOM_CONFIG, fetch the calendar and return the events
	const roomCalendars = await Promise.all(
		Object.entries(ROOM_CONFIG).map(([roomID]) => {
			return fetchRoomCalendarFromID(roomID, fetch);
		})
	);

	const roomsInfo = roomCalendars.map((roomCalendar) => {
		if (roomCalendar.status !== 200) {
			return {
				id: roomCalendar.room?.id,
				floor: roomCalendar.room?.floor,
				status: 'error'
			};
		}

    // TODO revert to today after testing
		let tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return {
			id: roomCalendar.room?.id,
			floor: roomCalendar.room?.floor,
			status: roomStatus(tomorrow, roomCalendar.room?.events ?? [])
		};
	});

	return { roomsInfo };
}

export function roomStatus(
	date: Date,
	events: PlainEvent[]
): { free: boolean; currentEvent: PlainEvent | null } {
	const filtered = events
		.filter((e) => {
			return isSameDay(date, new Date(e.start));
		})
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
