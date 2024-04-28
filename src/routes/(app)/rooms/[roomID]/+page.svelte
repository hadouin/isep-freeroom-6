<script lang="ts">
	// noinspection ES6UnusedImports
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import '@event-calendar/core/index.css';
	// @ts-ignore
	import Calendar from '@event-calendar/core';
	// @ts-ignore
	import ResourceTimeGrid from '@event-calendar/resource-time-grid';
	import type { RoomCalendar } from '$lib/rooms';
	import { calendarOptions } from '$lib/calendar';
	import { Loader } from '$lib/components/loader';

	export let data;

	let plugins = [ResourceTimeGrid];

	$: roomPromise = (async function getRoomById(roomID: string) {
		return fetch('/api/rooms/' + roomID)
			.then(async (res) => res.ok ?
				(await res.json()) as RoomCalendar
				: Promise.reject(new Error(res.status + res.statusText)));
	})(data.roomID);

	const formatTime = (date: Date) => {
		const hours = date.getHours().toString().padStart(2, '0');
		return `${hours}:00`;
	};

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
		<Loader />
	{:then response}
		{#if !response.room}
			<p class="text-lg">{response.status}</p>
		{:else}
			<Calendar
				{plugins}
				options={{
				...calendarOptions,
				view: 'resourceTimeGridDay',
				events: parseEvents(response.room.events),
				resources: [response.room.resource],
			}}
			/>
			<!-- <pre>{JSON.stringify(response, null, 2)}</pre> -->
		{/if}
	{:catch error}
		<p>Error</p>
	{/await}
</main>
