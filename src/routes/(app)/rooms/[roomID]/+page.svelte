<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import '@event-calendar/core/index.css';
	import Calendar from '@event-calendar/core';
	import ResourceTimeGrid from '@event-calendar/resource-time-grid';

	let plugins = [ResourceTimeGrid];
	$: options = {
		view: 'resourceTimeGridDay',
		events: data.room.events,
		resources: [data.room.resource],
		slotMinTime: '07:00:00',
		slotMaxTime: '21:00:00',
		allDaySlot: false,
		nowIndicator: true
	};
</script>

<main class="flex flex-col flex-1 gap-4 p-4 overflow-scroll md:gap-8 md:p-8">
	<Calendar {plugins} {options} />
</main>
