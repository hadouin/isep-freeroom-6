<script lang="ts">
	import * as Card from '../ui/card';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	export let roomId: string;

	$: roomPromise = (async function getRoomById(roomID: string) {
		const res = await fetch('/api/rooms/' + roomID);
		const value = await res.json();
		if (res.ok) {
			return value;
		} else {
			throw new Error(res.status + res.statusText);
		}
	})(roomId);

	const now = new Date();
	function getTimeTo(dateString: string) {
		const date = new Date(dateString);

		const hours = Math.trunc(
			(date.getTime() - now.getTime() + 1000 * 60) / (1000 * 60 * 60)
		).toString();
		const minutes = Math.trunc(((date.getTime() - now.getTime() + 1000 * 60) / (1000 * 60)) % 60)
			.toString()

		if (hours == '0') {
			return `${minutes}min`;
		}

		return `${hours}h${minutes.padStart(2, '0')}`;
	}
</script>

<Card.Root class="w-full md:w-96">
	<Card.Header>
		<Card.Title>
			<a href="/rooms/{roomId}">{roomId}</a>
		</Card.Title>
		<Card.Description>
			{#await roomPromise}
				<div class="w-40 h-2 rounded animate-pulse bg-slate-200"></div>
			{:then response}
				<Tooltip.Root openDelay={300}>
					<Tooltip.Trigger>
						{#if response.room.status.free}
							<span class="text-green-500">Libre</span>
							{#if response.room.status.currentEvent}
								<span class="text-gray-500">
									pendant {getTimeTo(response.room.status.currentEvent.start)}</span
								>
							{/if}
						{:else}
							<span class="text-red-500">Occupé</span>
						{/if}
					</Tooltip.Trigger>
					<Tooltip.Content>
						{#await roomPromise}
							<div class="w-40 h-2 rounded animate-pulse bg-slate-200"></div>
						{:then response}
							{#if response.room.status.currentEvent}
								<p>{response.room.status.currentEvent.title}</p>
								<p class="text-gray-500">
									{new Date(response.room.status.currentEvent.start).toLocaleTimeString('fr')} - {new Date(
										response.room.status.currentEvent.end
									).toLocaleTimeString('fr')}
								</p>
							{:else}
								<span class="text-gray-500">No events today</span>
							{/if}
						{/await}
					</Tooltip.Content>
				</Tooltip.Root>
			{:catch error}
				<p style="color: red">Erreur lors de la récuperation du calendrier</p>
			{/await}
		</Card.Description>
	</Card.Header>
	<!-- <Card.Content>

	</Card.Content> -->
</Card.Root>
