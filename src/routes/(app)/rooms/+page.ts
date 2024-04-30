import { ROOM_CONFIG } from '$lib/rooms-config';

export async function load() {
	const rooms = Object.keys(ROOM_CONFIG);

	return { rooms };
}
