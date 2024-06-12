import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
  window.open('https://portail-ovh.isep.fr/?logout=1', '_blank')?.focus();
  return redirect(301, '/');
};
