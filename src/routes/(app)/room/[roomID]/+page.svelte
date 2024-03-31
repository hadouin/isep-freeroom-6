<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import '@event-calendar/core/index.css';
	import Calendar from '@event-calendar/core';
	import ResourceTimeGrid from '@event-calendar/resource-time-grid';

	let plugins = [ResourceTimeGrid];
	let options = {
		view: 'resourceTimeGridDay',
		events: data.room.events,
		resources: [data.room.resource]
	};
</script>

<main class="flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-8">
	<p>Status: {data.status}</p>
	<Calendar {plugins} {options} />
	<pre class="w-[500px] overflow-scroll">{JSON.stringify(data.room, null, 2)}</pre>
</main>
