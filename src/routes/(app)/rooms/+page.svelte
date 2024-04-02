<script lang="ts">
	import { RoomCard } from '$lib/components/rooms';

	export let data;
</script>

<main class="flex flex-col flex-1 gap-4 p-4 overflow-scroll md:gap-8 md:p-8">
	{#each data.rooms as room}
		<RoomCard roomId={room.id} />
	{/each}
</main>
