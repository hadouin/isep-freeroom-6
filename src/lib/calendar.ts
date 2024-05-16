import type { Event, PlainEvent } from '$lib/events';
import { addWeeks, isWithinInterval, startOfDay } from 'date-fns';
import ICAL from 'ical.js';

export const dateOptions: Intl.DateTimeFormatOptions = {
  timeZone: 'Europe/Paris',
  dateStyle: 'medium',
  timeStyle: 'short',
};

export const timeOptions: Intl.DateTimeFormatOptions = {
  timeZone: 'Europe/Paris',
  timeStyle: 'short',
};

export const calendarOptions = {
  eventClick: ({ event }: { event: Event }) =>
    alert(`${event.title}\n
Salle: ${event.resourceIds[0]}
Début: ${event.start?.toLocaleString('fr-FR', dateOptions)} (Europe/Paris)
Fin:   ${event.end?.toLocaleString('fr-FR', dateOptions)} (Europe/Paris)`),
  slotMinTime: '08:00',
  slotMaxTime: '18:00',
  flexibleSlotTimeLimits: true,
  allDaySlot: false,
  nowIndicator: true,
  locale: 'fr',
  buttonText: {
    close: 'Fermer',
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
};

export function parseEvents(events: PlainEvent[]) {
  return events.map((event: PlainEvent) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
}

/**
 * Extracts calendar events from the given iCal data.
 *
 * @param icalRaw - The raw iCal data as a string.
 * @param resourceIds
 * @returns An array of Event objects representing the extracted calendar events.
 * @throws error Parsing the calendar data failed.
 */
export function extractCalEvents(icalRaw: string, resourceIds: string[]) {
  try {
    const nextWeek: Date = addWeeks(startOfDay(new Date()), 1);
    const calData = ICAL.parse(icalRaw);
    const subcomponents: ICAL.Event[] = new ICAL.Component(calData)
      .getAllSubcomponents('vevent')
      .map((subcomp: ICAL.Component) => new ICAL.Event(subcomp));

    const filteredEvents: ICAL.Event[] = subcomponents.filter((e: ICAL.Event) => {
      const isValidEvent: boolean = e.summary !== 'Férié' && !e.summary.startsWith('cours annulé');

      const startDate: Date = e.startDate.toJSDate();
      const today: Date = startOfDay(new Date());
      const isWithinNextWeek: boolean = isWithinInterval(startDate, {
        start: today,
        end: nextWeek,
      });

      return isValidEvent && isWithinNextWeek;
    });
    return filteredEvents.map((event: ICAL.Event) => ({
      // roomId: resourceIds[0],
      id: `${event.uid}`,
      resourceIds: resourceIds,
      title: event.summary,
      start: event.startDate.toJSDate(),
      end: event.endDate.toJSDate(),
      // allDay: event.summary === 'Férié',
    }));
  } catch (error) {
    console.error('failed parsing calendar', error, icalRaw);
    throw error;
  }
}
