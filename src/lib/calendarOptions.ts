import type { Event } from '$lib/events';
import { toast } from 'svelte-sonner';
import { dateTimeOptions } from '$lib/calendar';

export const calendarOptions = {
  eventClick: ({ event }: { event: Event }): void => {
    console.log('event clicked:', event);
    toast.message(`${event.title}`, {
      description: `Salle: ${event.resourceIds[0]} |
Début: ${event.start?.toLocaleString('fr', dateTimeOptions)} |
Fin:   ${event.end?.toLocaleString('fr', dateTimeOptions)}`,
      duration: 8000,
    });
  },
  slotMinTime: '08:00',
  slotMaxTime: '18:00',
  flexibleSlotTimeLimits: true, // default false, dynamic slotMinTime and slotMaxTime
  allDaySlot: false, // default true, show all-day events at the top of the calendar
  firstDay: 1, // default 0 (Sunday), 1 for Monday
  nowIndicator: true,
  locale: 'fr',
  buttonText: {
    close: 'fermer',
    dayGridMonth: 'mois',
    listDay: 'liste',
    listMonth: 'liste',
    listWeek: 'liste',
    listYear: 'liste',
    resourceTimeGridDay: 'jour',
    resourceTimeGridWeek: 'semaine',
    timeGridDay: 'jour',
    timeGridWeek: 'semaine',
    today: "aujourd'hui",
  },
  titleFormat: { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' },
  // lazyFetching: true, // default true, only works when changing from month to week to day
};
