<script lang="ts">
	// noinspection ES6UnusedImports
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	// noinspection ES6UnusedImports
	import * as Tabs from '$lib/components/ui/tabs';
	import type { Event } from '$lib/events';
	import type { Resource } from '$lib/resources';
	import type { Room } from '$lib/rooms';
	import '@event-calendar/core/index.css';
	// @ts-ignore
	import Calendar from '@event-calendar/core';
	// @ts-ignore
	import ResourceTimeGrid from '@event-calendar/resource-time-grid';
	import { Building } from '$lib/rooms-config';
	import { calendarOptions, parseEvents } from '$lib/calendar';
	import { Loader } from '$lib/components/loader';

	let isLoading = false;
	let rooms: Room[] = [];
	let selectedBuilding = Building.NDC;

	$: roomsPromise = (async (building: Building): Promise<void> => {
		isLoading = true;
		return fetch(`/api/rooms?building=${building}`)
			.then(async (res) => res.ok ?
				rooms = await res.json()
				: Promise.reject(new Error(res.status + res.statusText)))
			.finally(() => isLoading = false);
	})(selectedBuilding);

	let plugins = [ResourceTimeGrid];

	let events: Event[] = [];
	let resources: Resource[] = [];
</script>

<main class="flex flex-col flex-1 gap-4 p-4 overflow-scroll md:gap-8 md:p-8">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">Accueil</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>Calendrier</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	<Tabs.Root bind:value={selectedBuilding}>
		<Tabs.List class="ml-auto">
			{#each Object.values(Building) as building}
				<Tabs.Trigger class="text-zinc-600 dark:text-zinc-200 px-12" value={building}>
					{building}
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
		{#await roomsPromise}
			<Loader />
		{:then _}
			{#if isLoading}
				<Loader />
			{:else}
				<Calendar
					{plugins}
					options={{
						...calendarOptions,
						view: 'resourceTimeGridDay',
						events: rooms?.map((room) => parseEvents(room?.events)).flat(),
						resources: rooms?.map((room) => room.resource),
				}}
				/>
			{/if}
		{:catch error}
			<p>Error</p>
		{/await}
	</Tabs.Root>
</main>
