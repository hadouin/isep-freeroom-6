<script lang="ts">
  import { SearchBar } from '$lib/components/search';
  // noinspection ES6UnusedImports
  import * as Card from '$lib/components/ui/card';
  import { DoorOpen } from 'lucide-svelte';

  export let data;
  $: rooms = data.rooms;
</script>

<main class="flex flex-1 flex-col items-center justify-center gap-4 overflow-y-auto p-4 md:gap-8 md:p-8">
  <h2 class="text-2xl font-semibold tracking-tight transition-colors">Bienvenue sur FreeRoom</h2>
  <Card.Root>
    <Card.Header>
      <Card.Title>À la recherche d'une salle ?</Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="w-[300px]">
        <SearchBar {rooms} />
      </div>
    </Card.Content>
  </Card.Root>
  <a href="/rooms">
    <Card.Root>
      <Card.Header>
        <div class="flex w-[300px] items-center gap-4">
          <div class="rounded border border-gray-200 p-2">
            <DoorOpen class="h-8 w-8" />
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
