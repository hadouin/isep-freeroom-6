<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { get } from 'svelte/store';

	export let data;

	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	function getTimeTo(date: Date) {
		const hours = Math.trunc((date.getTime() - tomorrow.getTime()) / (1000 * 60 * 60));
		const minutes = Math.trunc((date.getTime() - tomorrow.getTime()) / (1000 * 60) % 60);
		return `${hours}h${minutes}`;
	}
</script>

<main class="flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-8">
	{#each data.roomsInfo as room}
		<Card.Root>
			<Card.Header>
				<Card.Title>{room.id}</Card.Title>
				<Card.Description>
					{#if room.status.free}
						<span class="text-green-500">Free</span>
						{#if room.status.currentEvent}
							<span class="text-gray-500"> for {getTimeTo(room.status.currentEvent.start)}</span>
						{/if}
					{:else}
						<span class="text-red-500">Occupied</span>
					{/if}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				{#if room.status.currentEvent}
					<p>{room.status.currentEvent.title}</p>
					<p>{room.status.currentEvent.start}</p>
					<p>{room.status.currentEvent.end}</p>
				{:else}
					<p>No events</p>
				{/if}
			</Card.Content>
		</Card.Root>
	{/each}
</main>
