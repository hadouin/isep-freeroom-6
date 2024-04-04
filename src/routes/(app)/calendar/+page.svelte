<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import type { Event } from '$lib/events';
	import type { Resource } from '$lib/resources';
	import '@event-calendar/core/index.css';
	// @ts-ignore
	import Calendar from '@event-calendar/core';
	//@ts-ignore
	import ResourceTimeGrid from '@event-calendar/resource-time-grid';

	$: roomsPromise = (async function () {
		const res = await fetch('/api/rooms');
		const value = await res.json();
		if (res.ok) {
			console.log(value);
			return value;
		} else {
			throw new Error(res.status + res.statusText);
		}
	})();

	function parseEvents(events: any[]) {
		return events.map((event: any) => {
			return {
				...event,
				start: new Date(event.start),
				end: new Date(event.end)
			};
		});
	}

	let plugins = [ResourceTimeGrid];

	let events: Event[] = [];
	let resources: Resource[] = [];
</script>

<main class="flex flex-col flex-1 gap-4 p-4 overflow-scroll md:gap-8 md:p-8">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>Calendrier</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	{#await roomsPromise}
		<p>...waiting</p>
	{:then response}
		<Calendar
			{plugins}
			options={{
				view: 'resourceTimeGridDay',
				events: response
					.map((room) => {
						return parseEvents(room.events);
					})
					.flat(),
				resources: response.map((room) => {
					return room.resource;
				}),
				slotMinTime: '07:30:00',
				slotMaxTime: '22:00:00',
				allDaySlot: false,
				nowIndicator: true,
				locale: 'fr'
			}}
		/>
	{:catch error}
		<p>Error</p>
	{/await}
</main>
