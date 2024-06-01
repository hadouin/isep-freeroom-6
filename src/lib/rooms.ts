import { error } from '@sveltejs/kit';
import { extractCalEvents } from './calendar';
import { buildCalendarUrl } from './rooms-config';
import type { PlainEvent } from '$lib/events';
import type { Event, Room } from '@prisma/client';
import prisma from '$lib/prisma';
import { endOfToday, isBefore, isWithinInterval, startOfToday } from 'date-fns';

export type RoomCalendar = Room & {
  availability: { isFree: boolean; currentEvent?: PlainEvent };
  events: Event[];
};

export async function fetchRoomEvents(room: Room): Promise<Event[]> {
  try {
    console.time('Fetching: ' + room.roomId);
    const res = await fetch(buildCalendarUrl(room.roomId, room.icalsecurise));
    const data: string = await res.text();
    console.timeEnd('Fetching: ' + room.roomId);

    return extractCalEvents(data, room.roomId).sort((a, b) => b.start.getTime() - a.start.getTime());
  } catch (e) {
    console.error(`could not retrieve the calendar for room: ${room.roomId}`, e);
    error(500, `Could not retrieve the calendar for room: ${room.roomId}`);
  }
}

export async function getRoom(roomId: string): Promise<Room> {
  const room: Room | null = await prisma.room.findUnique({
    where: { roomId },
  });

  if (!room) {
    error(404, 'Room not found');
  }
  return room;
}

export async function getRoomCalendars(): Promise<RoomCalendar[]> {
  const rooms: ({ events: Event[] } & Room)[] | null = await prisma.room.findMany({
    include: {
      events: {
        where: { start: { gte: startOfToday(), lte: endOfToday() } },
        orderBy: { start: 'asc' },
      },
    },
    orderBy: { roomId: 'asc' },
  });

  // current time(ms) - timezoneOffset(min), converted to ms for Date constructor
  const nowUTC = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);

  return rooms.map((room) => ({
    ...room,
    availability: roomStatus(nowUTC, room.events || []),
  }));
}

function roomStatus(date: Date, sortedEvents: PlainEvent[]): { isFree: boolean; currentEvent?: PlainEvent } {
  for (const event of sortedEvents) {
    if (isWithinInterval(date, { start: event.start, end: event.end })) {
      return { isFree: false, currentEvent: event };
    }

    if (isBefore(date, event.start)) {
      return { isFree: true, currentEvent: event };
    }
  }
  return { isFree: true };
}
