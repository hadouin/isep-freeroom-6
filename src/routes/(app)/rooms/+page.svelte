<script lang="ts">
	import { RoomCard } from '$lib/components/rooms';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

	export let data;
</script>

<main class="flex flex-col flex-1 gap-4 p-4 overflow-scroll md:gap-8 md:p-8">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/rooms">Salles</Breadcrumb.Link>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	{#each data.rooms as room}
		<RoomCard roomId={room.id} />
	{/each}
</main>
