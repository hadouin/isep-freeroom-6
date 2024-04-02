<script lang="ts">
	import { RoomCard } from '$lib/components/rooms';

	export let data;
</script>

{#each data.rooms as room}
	<RoomCard roomId={room.id} />
{/each}
