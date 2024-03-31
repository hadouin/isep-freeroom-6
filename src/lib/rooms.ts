import { extractCalEvents } from './calendar';
import type { PlainResource } from './resources';
import { ROOM_CONFIG, type RoomConfig } from './rooms-config';

export async function fetchRoomCalendarFromID(roomID: string, fetch: Function = globalThis.fetch) {
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
			}
		};
	} catch (e) {
		console.error(`could not retrieve the calendar for room: ${roomID}`, e);
		return { status: 500, error: 'Could not retrieve the calendar' };
	}
}

function createResource(roomConfig: RoomConfig): PlainResource {
	return {
		id: roomConfig.id,
		title: roomConfig.id
	};
}
