<script lang="ts">
	import { SearchBar } from '$lib/components/search';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { DoorOpen } from 'lucide-svelte';
</script>

<main
	class="flex flex-col items-center justify-center flex-1 gap-4 p-4 overflow-scroll md:gap-8 md:p-8"
>
	<h1 class="text-xl">Bienvenue sur FreeRoom</h1>
	<Card.Root>
		<Card.Header>
			<Card.Title>Trouver une salle</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="w-full">
				<SearchBar>
					<div class="w-full mt-2">
						<Button class="w-full" type="submit">Find</Button>
					</div>
				</SearchBar>
			</div>
		</Card.Content>
	</Card.Root>
	<a href="/rooms">
		<Card.Root>
			<Card.Header>
				<div class="flex items-center gap-4">
					<div class="p-2 border border-gray-200 rounded">
						<DoorOpen class="w-8 h-8" />
					</div>
					<div>
						<Card.Title>Voir tout</Card.Title>
						<Card.Description>Liste de toutes les salles</Card.Description>
					</div>
				</div>
			</Card.Header>
		</Card.Root>
	</a>
</main>
