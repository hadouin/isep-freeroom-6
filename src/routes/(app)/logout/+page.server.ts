import { serverLoad, getUsername } from '@macfja/sveltekit-session';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async (event) => {
  return serverLoad(event);
};
