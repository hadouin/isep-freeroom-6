import prisma from '$lib/prisma';
import { Building, type Event, type Room } from '@prisma/client';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const buildingParam = url.searchParams.get('building');
  let building: Building | null;
  if (!buildingParam) {
    building = null;
  } else if (!(buildingParam in Building)) {
    error(404, 'The building is not valid');
  } else {
    building = buildingParam as Building;
  }

  try {
    const rooms: ({ events: Event[] } & Room)[] = await prisma.room.findMany({
      where: {
        ...(building ? { building } : {}),
      },
      include: {
        events: {
          where: { start: { gte: getStartOfWeek() } },
          orderBy: { start: 'asc' },
        },
      },
      orderBy: { roomId: 'asc' },
    });

    return json(rooms);
  } catch (e) {
    error(500, 'Could not retrieve the calendar for rooms');
  }
}

function getStartOfWeek(date: Date = new Date()): Date {
  // Get the day of the week
  const dayOfWeek = date.getDay();
  // Calculate the number of days to subtract to get to Monday=1 (Sunday=0, Saturday=6)
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  // Subtract the days to the current day of the month
  date.setDate(date.getDate() - daysToSubtract);
  date.setHours(0, 0, 0, 0);
  return date;
}
