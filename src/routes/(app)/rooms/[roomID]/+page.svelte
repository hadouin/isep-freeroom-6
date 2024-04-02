<script lang="ts">
	import type { PageData } from '../$types';
	import '@event-calendar/core/index.css';
	import Calendar from '@event-calendar/core';
	import ResourceTimeGrid from '@event-calendar/resource-time-grid';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

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

	function parseEvents(events: any[]) {
		return events.map((event: any) => {
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
				<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
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
		<p>...waiting</p>
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
				locale: 'fr'
			}}
		/>
		<!-- <pre>{JSON.stringify(response, null, 2)}</pre> -->
	{:catch error}
		<p>Error</p>
	{/await}
</main>
