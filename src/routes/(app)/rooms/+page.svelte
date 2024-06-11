<script lang="ts">
  import { RoomCard } from '$lib/components/rooms';
  // noinspection ES6UnusedImports
  import * as Breadcrumb from '$lib/components/ui/breadcrumb';
  import { Filter } from '../../../lib/components/faceted-filter';
  import { Button } from '$lib/components/ui/button';
  import { Building, Floor } from '@prisma/client';
  import { floorMap } from '$lib/rooms';
  import { writable } from 'svelte/store';
  import X from 'lucide-svelte/icons/x';

  export let data;

  let floorFilter: Floor[] = [];
  let buildingFilter: Building[] = [];

  const filterValues = writable({ floor: [] as Floor[], building: [] as Building[] });

  filterValues.subscribe((values) => {
    floorFilter = values.floor;
    buildingFilter = values.building;
  });

  $: showReset = Object.values({ ...$filterValues }).some((v) => v.length > 0);

  function resetFilters() {
    $filterValues.floor = [];
    $filterValues.building = [];
  }
  const filterIncludes = (filter: any[], value: string) => filter.length === 0 || filter.includes(value);
</script>

<main class="flex flex-1 flex-col gap-4 overflow-y-auto p-4 md:gap-6 md:p-8">
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

  <div class="flex items-center space-x-2">
    <Filter
      bind:filterValues={$filterValues.building}
      options={Object.entries(Building).map(([value, label]) => ({ label, value }))}
      title="Bâtiment"
    />
    <Filter
      bind:filterValues={$filterValues.floor}
      options={Object.entries(floorMap).map(([value, label]) => ({ label, value }))}
      title="Étage"
    />
    {#if showReset}
      <Button on:click={resetFilters} variant="ghost" class="h-8 px-2 lg:px-3">
        Réinitialiser<X class="ml-2 h-4 w-4" />
      </Button>
    {/if}
  </div>

  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    {#each data.rooms || [] as room}
      {#if filterIncludes(floorFilter, room.floor) && filterIncludes(buildingFilter, room.building)}
        <RoomCard {room} />
      {/if}
    {/each}
  </div>
</main>
