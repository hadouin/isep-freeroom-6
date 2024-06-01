import type { Event } from '$lib/events';
import { startOfWeek } from 'date-fns';
import ICAL from 'ical.js';
import type { Event as PrismaEvent } from '@prisma/client';
import { toast } from 'svelte-sonner';

export const dateOptions: Intl.DateTimeFormatOptions = {
  dateStyle: 'medium',
  timeStyle: 'short',
};

export const timeOptions: Intl.DateTimeFormatOptions = {
  timeStyle: 'short',
};

// noinspection JSUnusedGlobalSymbols
export const calendarOptions = {
  eventClick: ({ event }: { event: Event }): void => {
    console.log('event', event);
    toast.message(`${event.title}`, {
      description: `Salle: ${event.resourceIds[0]} |
Début: ${event.start?.toLocaleString('fr', dateOptions)} |
Fin:   ${event.end?.toLocaleString('fr', dateOptions)}`,
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

/**
 * Extracts calendar events from the given iCal data.
 *
 * @param icalRaw - The raw iCal data as a string.
 * @param roomId
 * @returns An array of Event objects representing the extracted calendar events.
 * @throws error Parsing the calendar data failed.
 */
export function extractCalEvents(icalRaw: string, roomId: string): PrismaEvent[] {
  const now = new Date();
  try {
    const calData = ICAL.parse(icalRaw);
    const subcomponents: ICAL.Event[] = new ICAL.Component(calData)
      .getAllSubcomponents('vevent')
      .map((subcomp: ICAL.Component) => new ICAL.Event(subcomp));

    const filteredEvents: ICAL.Event[] = subcomponents.filter((e: ICAL.Event) => {
      const isValidEvent: boolean = e.summary !== 'Férié' && !e.summary.startsWith('cours annulé');

      const startDate: Date = e.startDate.toJSDate();
      const weekStart: Date = startOfWeek(now, { weekStartsOn: 1 });
      const isAfterWeekStart: boolean = startDate >= weekStart;

      return isValidEvent && isAfterWeekStart;
    });

    return filteredEvents.map(
      (event: ICAL.Event): PrismaEvent => ({
        id: `${event.uid}`,
        resourceIds: [roomId],
        title: event.summary,
        // unixTime (in s) - timezoneOffset (in min), converted to ms for Date constructor
        start: new Date((event.startDate.toUnixTime() - now.getTimezoneOffset() * 60) * 1000),
        end: new Date((event.endDate.toUnixTime() - now.getTimezoneOffset() * 60) * 1000),
        roomId,
        // allDay: event.summary === 'Férié',
      })
    );
  } catch (error) {
    console.error('failed parsing calendar', error, icalRaw);
    throw error;
  }
}
