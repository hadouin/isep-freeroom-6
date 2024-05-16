import { error } from '@sveltejs/kit';
import { extractCalEvents } from './calendar';
import type { PlainResource } from './resources';
import { buildCalendarUrl, ROOM_CONFIG, type RoomConfig } from './rooms-config';
import type { PlainEvent } from '$lib/events';
import type { Event as PrismaEvent, Room as PrismaRoom } from '@prisma/client';

export interface Room {
  id: string;
  floor: string;
  resource: PlainResource;
  events: PlainEvent[];
  availability?: { isFree: boolean; currentEvent?: PlainEvent };
}

export interface RoomCalendar {
  status: number;
  room?: Room;
  error?: string;
}

export async function getRoomById(roomID: string) {
  return fetch('/api/rooms/' + roomID).then(async (res) =>
    res.ok ? ((await res.json()) as RoomCalendar) : Promise.reject(new Error(res.status + res.statusText))
  );
}

export async function fetchRoomCalendarFromID(
  roomID: string,
  fetch: Function = globalThis.fetch
): Promise<RoomCalendar> {
  const roomConfig: RoomConfig = ROOM_CONFIG[roomID];
  if (!roomConfig) {
    return { status: 404, error: 'Room not found' };
  }

  try {
    console.time('Fetching: ' + roomID);
    const res = await fetch(buildCalendarUrl(roomID, roomConfig.icalsecurise));
    const data: string = await res.text();
    console.timeEnd('Fetching: ' + roomID);

    return {
      status: 200,
      room: {
        id: roomID,
        floor: roomConfig.floor,
        resource: createResource(roomConfig, roomID),
        events: extractCalEvents(data, [roomID]),
      },
    };
  } catch (e) {
    console.error(`could not retrieve the calendar for room: ${roomID}`, e);
    throw error(500, 'Could not retrieve the calendar for room: ' + roomID);
  }
}

export async function getRoomCalendar(room: PrismaRoom): Promise<Omit<PrismaEvent, 'roomId'>[]> {
  try {
    console.time('Fetching: ' + room.roomId);
    const res = await fetch(buildCalendarUrl(room.roomId, room.icalsecurise));
    const data: string = await res.text();
    console.timeEnd('Fetching: ' + room.roomId);

    return extractCalEvents(data, [room.roomId]);
  } catch (e) {
    console.error(`could not retrieve the calendar for room: ${room.roomId}`, e);
    throw error(500, 'Could not retrieve the calendar for room: ' + room.roomId);
  }
}

const createResource = (roomConfig: RoomConfig, roomID: string): PlainResource => ({
  id: roomID,
  title: roomConfig.title,
});
