import { startOfWeek } from 'date-fns';
import ICAL from 'ical.js';
import type { Event } from '@prisma/client';

export const dateOptions: Intl.DateTimeFormatOptions = { dateStyle: 'medium', timeZone: 'Europe/Paris' };
export const timeOptions: Intl.DateTimeFormatOptions = { timeStyle: 'short', timeZone: 'Europe/Paris' };
export const dateTimeOptions: Intl.DateTimeFormatOptions = { ...dateOptions, ...timeOptions };

type EventSourceParams = (
  fetchInfo: { startStr: string; endStr: string; start: Date; end: Date },
  successCallback: (events: Event[]) => void,
  failureCallback: (error: any) => void
) => void;

export const fetchEvents = (params: { [key: string]: any }): EventSourceParams => {
  return ({ startStr, endStr }, successCallback, failureCallback) => {
    fetch(`/api/events?${new URLSearchParams({ ...params, start: startStr, end: endStr })}`)
      .then(async (response) => (await response.json()) as Event[])
      .then((data) => data?.map((event) => ({ ...event, start: new Date(event.start), end: new Date(event.end) })))
      .then((data) => successCallback(data))
      .catch((error) => failureCallback(error));
  };
};

export function extractCalEvents(icalRaw: string, roomId: string): Event[] {
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
      (event: ICAL.Event): Event => ({
        id: `${event.uid}`,
        resourceIds: [roomId],
        title: event.summary,
        // unixTime (in s), converted to ms for Date constructor
        start: new Date(event.startDate.toUnixTime() * 1000),
        end: new Date(event.endDate.toUnixTime() * 1000),
        roomId,
      })
    );
  } catch (error) {
    console.error('failed parsing calendar', error, icalRaw);
    throw error;
  }
}
