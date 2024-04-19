import { error } from '@sveltejs/kit';
import { extractCalEvents } from './calendar';
import type { PlainResource } from './resources';
import { ROOM_CONFIG, type RoomConfig } from './rooms-config';

export async function fetchRoomCalendarFromID(
	roomID: string,
	fetch: Function = globalThis.fetch
): Promise<
	| { status: number; error: string; room?: undefined; ical?: undefined }
	| {
			status: number;
			room: {
				id: string;
				floor: number;
				resource: PlainResource;
				events: import('$lib/events').PlainEvent[];
			};
			ical: any;
			error?: undefined;
	  }
> {
	const roomConfig: RoomConfig = ROOM_CONFIG[roomID];
	if (!roomConfig) {
		return { status: 404, error: 'Room not found' };
	}

	console.log('Fetching calendar for room: ' + roomID);
	try {
		const res = await fetch(roomConfig.ical);
		const data = await res.text();

		return {
			status: 200,
			room: {
				id: roomID,
				floor: roomConfig.floor,
				resource: createResource(roomConfig),
				events: extractCalEvents(data, [roomConfig.id])
			},
			ical: res
		};
	} catch (e) {
		console.error(`could not retrieve the calendar for room: ${roomID}`, e);
		throw error(500, 'Could not retrieve the calendar for room: ' + roomID);
	}
}

function createResource(roomConfig: RoomConfig): PlainResource {
	return {
		id: roomConfig.id,
		title: roomConfig.id
	};
}
