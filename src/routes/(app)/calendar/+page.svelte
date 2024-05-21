<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Breadcrumb from '$lib/components/ui/breadcrumb';
  // noinspection ES6UnusedImports
  import * as Tabs from '$lib/components/ui/tabs';
  import '@event-calendar/core/index.css';
  import Calendar from '@event-calendar/core';
  import ResourceTimeGrid from '@event-calendar/resource-time-grid';
  import { Building, type Event, type Room } from '@prisma/client';
  import { calendarOptions } from '$lib/calendar';
  import { Loader } from '$lib/components/loader';

  let isLoading = false;
  let rooms: ({events: Event[]} & Room)[] = [];
  let selectedBuilding = Building.NDC;

  $: roomsPromise = (async (building: Building): Promise<void> => {
    isLoading = true;
    return fetch(`/api/rooms?building=${building}`)
      .then(async (res) =>
        res.ok ? (rooms = await res.json()) : Promise.reject(new Error(res.status + res.statusText))
      )
      .finally(() => (isLoading = false));
  })(selectedBuilding);

  let plugins = [ResourceTimeGrid];
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
    {#await roomsPromise}
      <Loader />
    {:then _}
      {#if isLoading}
        <Loader />
      {:else}
        <Calendar
          {plugins}
          options={{
            ...calendarOptions,
            view: 'resourceTimeGridDay',
            headerToolbar: {
              start: '',
              center: 'title',
              end: 'prev,next today',
            },
            events: rooms?.map(({ events }) => events).flat(),
            resources: rooms?.map(({ roomId, title }) => ({
              id: roomId,
              title: { html: `<a href="rooms/${roomId}">${title}</a>` },
            })),
          }}
        />
      {/if}
    {:catch _error}
      <p>Error</p>
    {/await}
  </Tabs.Root>
</main>
