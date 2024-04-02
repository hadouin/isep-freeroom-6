<script lang="ts">
	import * as Card from '../ui/card';

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

		const hours = Math.trunc((date.getTime() - now.getTime()) / (1000 * 60 * 60))
			.toString()
			.padStart(2, '0');
		const minutes = Math.trunc(((date.getTime() - now.getTime()) / (1000 * 60)) % 60)
			.toString()
			.padStart(2, '0');
		return `${hours}h${minutes}`;
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>
			<a href="/rooms/{roomId}">{roomId}</a>
		</Card.Title>
		<Card.Description>
			{#await roomPromise}
				<div class="w-40 h-2 rounded animate-pulse bg-slate-200"></div>
			{:then response}
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
			{:catch error}
				<p style="color: red">{JSON.stringify(error, null, 2)}</p>
			{/await}
		</Card.Description>
	</Card.Header>
	<Card.Content>
		{#await roomPromise}
			<div class="w-40 h-2 rounded animate-pulse bg-slate-200"></div>
		{:then response}
			{#if response.room.status.currentEvent}
				<p>{response.room.status.currentEvent.title}</p>
				<p class="text-gray-500">
					{new Date(response.room.status.currentEvent.start).toLocaleTimeString()} - {new Date(response.room.status.currentEvent.end).toLocaleTimeString()}
				</p>
			{:else}
				<span class="text-gray-500">No events today</span>
			{/if}
		{/await}
	</Card.Content>
</Card.Root>
