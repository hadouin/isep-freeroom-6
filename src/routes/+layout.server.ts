import type { LayoutServerLoad } from './$types';
import { serverLoad } from '@macfja/sveltekit-session';

export const load: LayoutServerLoad = serverLoad;
