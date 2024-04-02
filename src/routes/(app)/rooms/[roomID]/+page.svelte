<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;

	import '@event-calendar/core/index.css';
	import Calendar from '@event-calendar/core';
	import ResourceTimeGrid from '@event-calendar/resource-time-grid';

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
</script>

<main class="flex flex-col flex-1 gap-4 p-4 overflow-scroll md:gap-8 md:p-8">
	{#await roomPromise}
		<p>...waiting</p>
	{:then response}
		<Calendar
			{plugins}
			options={{
				view: 'resourceTimeGridDay',
				events: response.room.events,
				resources: [response.room.resource],
				slotMinTime: '07:00:00',
				slotMaxTime: '21:00:00',
				allDaySlot: false,
				nowIndicator: true
			}}
		/>
	{:catch error}
		<p>Error</p>
	{/await}
</main>
