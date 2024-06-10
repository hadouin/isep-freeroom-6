import prisma from '$lib/prisma';
import { Building } from '@prisma/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const buildingParam = url.searchParams.get('building');
  const startParam = url.searchParams.get('start');
  const endParam = url.searchParams.get('end');
  const roomId = url.searchParams.get('roomId');

  let building: Building | undefined;
  if (buildingParam) {
    if (!(buildingParam in Building)) {
      error(400, 'The building is not valid');
    }
    building = buildingParam as Building;
  }

  let start: Date;
  let end: Date;
  if (!startParam || !endParam) {
    error(400, 'The start and end parameters are required');
  } else {
    start = new Date(startParam);
    end = new Date(endParam);
  }

  try {
    const events = await prisma.event.findMany({
      where: {
        ...(building ? { room: { building } } : {}),
        ...(roomId ? { room: { roomId } } : {}),
        start: { gte: start },
        end: { lte: end },
      },
      orderBy: { start: 'asc' },
    });

    return json(events);
  } catch (e) {
    console.error(`Could not retrieve the calendar for ${building} ${roomId ?? 'rooms'} from ${start} to ${end}`, e);
    error(500, 'Could not retrieve the calendar for rooms');
  }
};
