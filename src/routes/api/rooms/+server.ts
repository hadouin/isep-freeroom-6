import prisma from '$lib/prisma';
import { Building, type Room } from '@prisma/client';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const buildingParam = url.searchParams.get('building');
  let building: Building | undefined;
  if (buildingParam) {
    if (!(buildingParam in Building)) {
      error(400, 'The building is not valid');
    }
    building = buildingParam as Building;
  }

  try {
    const rooms: Room[] = await prisma.room.findMany({
      where: {
        ...(building ? { building } : {}),
      },
      orderBy: { roomId: 'asc' },
    });

    return json(rooms);
  } catch (e) {
    error(500, 'Could not retrieve the calendar for rooms');
  }
};
