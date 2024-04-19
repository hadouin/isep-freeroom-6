<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import '@event-calendar/core/index.css';
	import Calendar from '@event-calendar/core';
	// @ts-ignore
	import ResourceTimeGrid from '@event-calendar/resource-time-grid';
	import type { PageData } from '../$types';

	export let data: PageData;

	let plugins = [ResourceTimeGrid];

	$: roomPromise = (async function getRoomById(roomID: string) {
		const res = await fetch('/api/rooms/' + roomID);
		const value = await res.json();
		if (res.ok) {
			return value;
		} else {
			throw new Error(res.status + res.statusText);
		}
	})(data.roomID);

	function parseEvents(events: import('$lib/events').PlainEvent[]) {
		return events.map((event: import('$lib/events').PlainEvent) => {
			return {
				...event,
				start: new Date(event.start),
				end: new Date(event.end)
			};
		});
	}
</script>

<main class="flex flex-col flex-1 gap-4 p-4 overflow-scroll md:gap-8 md:p-8">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">Accueil</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/rooms">Salles</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>{data.roomID}</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	{#await roomPromise}
		<p>Chargement...</p>
	{:then response}
		<Calendar
			{plugins}
			options={{
				view: 'resourceTimeGridDay',
				events: parseEvents(response.room.events),
				resources: [response.room.resource],
				slotMinTime: '07:00:00',
				slotMaxTime: '21:00:00',
				allDaySlot: false,
				nowIndicator: true,
				locale: 'fr',
				buttonText: {close: 'Fermer', dayGridMonth: 'mois', listDay: 'liste', listMonth: 'liste', listWeek: 'liste', listYear: 'liste', resourceTimeGridDay: 'jour', resourceTimeGridWeek: 'semaine', timeGridDay: 'jour', timeGridWeek: 'semaine', today: 'aujourd\'hui'}
			}}
		/>
		<!-- <pre>{JSON.stringify(response, null, 2)}</pre> -->
	{:catch error}
		<p>Error</p>
	{/await}
</main>
