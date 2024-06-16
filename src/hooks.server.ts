import { sessionHook } from '@macfja/sveltekit-session';
import { casHandler } from '@macfja/sveltekit-cas';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = sequence(
  sessionHook(),
  casHandler(
    'https://portail-ovh.isep.fr',
    3,
    (event: RequestEvent) => event.url.pathname.startsWith('/admin') || event.url.pathname.startsWith('/account')
  )
);
