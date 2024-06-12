import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/formSchema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
  return {
    title: 'Réservation',
    form: await superValidate(zod(formSchema)),
  };
};

// handle form submission
export const actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    try {
      await prisma.reservation.create({
        data: {
          firstname: form.data.firstname,
          lastname: form.data.lastname,
          email: form.data.email,
          reason: form.data.reason,
          rooms: { connect: form.data.rooms.map((roomId) => ({ roomId })) },
          startDate: form.data.startDate,
          startTime: form.data.startTime,
          endTime: form.data.endTime,
          endDate: form.data.endDate,
          comments: form.data.comments,
        },
      });

      fetch(`/api/reservation/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.data),
      }).then((response) => {
        console.log(response.text());
      });
    } catch (e) {
      console.error('Impossible de créer la réservation', e);
      return fail(500, {
        form,
        error: 'Impossible de créer la réservation',
      });
    }
    return { form };
  },
};
