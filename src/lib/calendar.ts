import type { PlainEvent } from '$lib/events.ts';
import { addWeeks, isWithinInterval, startOfDay } from 'date-fns';
import ICAL from 'ical.js';

/**
 * Extracts calendar events from the given iCal data.
 *
 * @param icalRaw - The raw iCal data as a string.
 * @param resourceIds
 * @returns An array of Event objects representing the extracted calendar events.
 * @throws error Parsing the calendar data failed.
 */
export function extractCalEvents(icalRaw: string, resourceIds: string[]): PlainEvent[] {
	try {
		const nextWeek = addWeeks(startOfDay(new Date()), 1);
		const calData = ICAL.parse(icalRaw);
		const subcomponents = new ICAL.Component(calData)
			.getAllSubcomponents('vevent')
			.map((subcomp: any) => new ICAL.Event(subcomp));

		const filteredEvents = subcomponents.filter((e: any) => {
			const isValidEvent = e.summary !== 'Férié' && !e.summary.startsWith('cours annulé');

			const startDate = e.startDate.toJSDate();
			const today = startOfDay(new Date());
			const isWithinNextWeek = isWithinInterval(startDate, {
				start: today,
				end: nextWeek
			});

			return isValidEvent && isWithinNextWeek;
		});
		return filteredEvents.map((event: any): PlainEvent => ({
			id: `${event.uid}`,
			resourceIds: resourceIds,
			title: event.summary,
			start: event.startDate.toJSDate(),
			end: event.endDate.toJSDate()
		}));
	} catch (error) {
		console.error('failed parsing calendar', error, icalRaw);
		throw error;
	}
}