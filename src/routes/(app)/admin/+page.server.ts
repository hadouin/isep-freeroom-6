import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const reservations = await prisma.reservation.findMany();

  return { reservations };
};
