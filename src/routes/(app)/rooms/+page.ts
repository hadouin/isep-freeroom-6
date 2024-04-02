import { ROOM_CONFIG } from '$lib/rooms-config';

export async function load() {
	const rooms = Object.entries(ROOM_CONFIG).map(([key, value]) => {
		return value;
	});

	return { rooms };
}
