import { fetchRoomCalendarFromID } from '$lib/rooms';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }: { fetch: any; params: { roomID: string } }) {
	const roomCalendar = await fetchRoomCalendarFromID(params.roomID, fetch);
	return roomCalendar;
}
