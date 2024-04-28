<script lang="ts">
	import { RoomCard } from '$lib/components/rooms';
	// noinspection ES6UnusedImports
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';

	export let data;
</script>

<main class="flex flex-col flex-1 gap-2 p-4 overflow-scroll md:p-8">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">Accueil</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>Salles</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>
	<div class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
		{#each data.rooms as roomID}
			<RoomCard roomId={roomID} />
		{/each}
	</div>
</main>
