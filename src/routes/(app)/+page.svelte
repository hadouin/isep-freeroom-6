<script lang="ts">
  import { SearchBar } from '$lib/components/search';
  import { Button } from '$lib/components/ui/button';
  // noinspection ES6UnusedImports
  import * as Card from '$lib/components/ui/card';
  import { DoorOpen } from 'lucide-svelte';
</script>

<main class="flex flex-1 flex-col items-center justify-center gap-4 overflow-scroll p-4 md:gap-8 md:p-8">
  <h1 class="text-xl">Bienvenue sur FreeRoom</h1>
  <Card.Root>
    <Card.Header>
      <Card.Title>Trouver une salle</Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="w-full">
        <SearchBar>
          <div class="mt-2 w-full">
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
