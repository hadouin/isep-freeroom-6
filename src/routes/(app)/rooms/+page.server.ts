import { getRoomCalendars } from '$lib/rooms';

export async function load() {
  const rooms = await getRoomCalendars();

  return { title: 'Salles', rooms };
}
