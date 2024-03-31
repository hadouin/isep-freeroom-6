import type { PlainEvent } from '$lib/events.ts';
import type { PlainResource } from '$lib/resources';
import { ROOM_CONFIG, type RoomConfig } from '$lib/rooms-config';
import { addWeeks, isWithinInterval, startOfDay } from 'date-fns';
import ICAL from 'ical.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }: { fetch: any; params: { roomID: string } }) {
	const roomConfig: RoomConfig = ROOM_CONFIG[params.roomID];
	if (!roomConfig) {
		return { status: 404, error: 'Room not found' };
	}

	console.log('Fetching calendar for room: ' + params.roomID);
	try {
		const res = await fetch(roomConfig.ical);
		const data = await res.text();

		return {
			status: 200,
			room: {
				id: params.roomID,
				floor: roomConfig.floor,
				resource: createResource(roomConfig),
				events: extractCalEvents(data, [roomConfig.id])
			}
		};
	} catch (e) {
		console.error(`could not retrieve the calendar for room: ${params.roomID}`, e);
		return { status: 500, error: 'Could not retrieve the calendar' };
	}
}

/**
 * Extracts calendar events from the given iCal data.
 *
 * @param icalRaw - The raw iCal data as a string.
 * @returns An array of Event objects representing the extracted calendar events.
 * @throws If there is an error parsing the calendar data.
 */
function extractCalEvents(icalRaw: string, resourceIds: string[]): PlainEvent[] {
	try {
		const nextWeek = addWeeks(startOfDay(new Date()), 1);
		const calData = ICAL.parse(icalRaw);
		const subcomponents = new ICAL.Component(calData)
			.getAllSubcomponents('vevent')
			.map((subcomp: any) => new ICAL.Event(subcomp));

		const filteredEvents = subcomponents.filter((e: any) => {
			const isValidEvent = e.summary !== 'Férié' && !e.summary.startsWith('cours annulé');

			const startDate = e.startDate.toJSDate();
			const isWithinNextWeek = isWithinInterval(startDate, {
				start: new Date(),
				end: nextWeek
			});

			return isValidEvent && isWithinNextWeek;
		});
		const events: PlainEvent[] = filteredEvents.map((event: any): PlainEvent => {
			const plainEvent: PlainEvent = {
				id: `${event.uid}`,
				resourceIds: resourceIds,
				title: event.summary,
				start: event.startDate.toJSDate(),
				end: event.endDate.toJSDate()
			};
			return plainEvent;
		});
		return events;
	} catch (error) {
		console.error('failed parsing calendar', error, icalRaw);
		throw error;
	}
}

function createResource(roomConfig: RoomConfig): PlainResource {
	return {
		id: roomConfig.id,
		title: roomConfig.id
	};
}
