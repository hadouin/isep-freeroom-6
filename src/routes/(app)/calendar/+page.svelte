<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Breadcrumb from '$lib/components/ui/breadcrumb';
  // noinspection ES6UnusedImports
  import * as Tabs from '$lib/components/ui/tabs';
  import '@event-calendar/core/index.css';
  import Calendar from '@event-calendar/core';
  import ResourceTimeGrid from '@event-calendar/resource-time-grid';
  import { Building, type Room } from '@prisma/client';
  import { calendarOptions } from '$lib/calendar';
  import { Loader } from '$lib/components/loader';
  import { onMount } from 'svelte';
  import { error } from '@sveltejs/kit';
  import { Toaster } from '$lib/components/ui/sonner';

  let isLoading = true;
  let rooms: Room[] = [];
  let selectedBuilding = Building.NDC;
  $: selectedRooms = ((rooms, selectedBuilding) => rooms?.filter(({ building }) => building === selectedBuilding))(
    rooms,
    selectedBuilding
  );

  onMount(async () => {
    try {
      await fetch(`/api/rooms`).then(async (res) =>
        res.ok ? (rooms = await res.json()) : Promise.reject(new Error(res.status + res.statusText))
      );
    } catch (e) {
      error(500, 'Could not fetch rooms');
    } finally {
      isLoading = false;
    }
  });

  let ec: any;

  $: if (selectedBuilding && ec) ec.refetchEvents();
</script>

<main class="flex flex-1 flex-col gap-4 overflow-scroll p-4 md:gap-8 md:p-8">
  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Accueil</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>Calendrier</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>

  <Tabs.Root bind:value={selectedBuilding}>
    <Tabs.List class="ml-auto">
      {#each Object.values(Building) as building}
        <Tabs.Trigger class="px-12 text-zinc-600 dark:text-zinc-200" value={building}>
          {building}
        </Tabs.Trigger>
      {/each}
    </Tabs.List>
  </Tabs.Root>
  {#if isLoading}
    <Loader />
  {:else}
    <Calendar
      bind:this={ec}
      plugins={[ResourceTimeGrid]}
      options={{
        ...calendarOptions,
        view: 'resourceTimeGridDay',
        headerToolbar: {
          start: '',
          center: 'title',
          end: 'prev,next today',
        },
        eventSources: [{ url: '/api/events', extraParams: { building: selectedBuilding } }],
        resources: selectedRooms?.map(({ roomId, title }) => ({
          id: roomId,
          title: { html: `<a href="rooms/${roomId}">${title}</a>` },
        })),
      }}
    />
    <Toaster />
  {/if}
</main>
