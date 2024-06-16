<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Breadcrumb from '$lib/components/ui/breadcrumb';
  // noinspection ES6UnusedImports
  import * as Tabs from '$lib/components/ui/tabs';
  import '@event-calendar/core/index.css';
  import Calendar from '@event-calendar/core';
  import ResourceTimeGrid from '@event-calendar/resource-time-grid';
  import { Building } from '@prisma/client';
  import { Loader } from '$lib/components/loader';
  import { Toaster } from '$lib/components/ui/sonner';
  import { calendarOptions } from '$lib/calendarOptions';
  import { fetchEvents } from '$lib/calendar';

  export let data;
  $: rooms = data.rooms;

  let isLoading = true;

  let selectedBuilding = Building.NDC;
  $: selectedRooms = ((rooms, selectedBuilding) => rooms?.filter(({ building }) => building === selectedBuilding))(
    rooms,
    selectedBuilding
  );

  let ec: any;

  $: if (selectedBuilding && ec) ec.refetchEvents();

  function loading(isLoadingLocal: boolean) {
    isLoading = isLoadingLocal;
  }
</script>

<main class="flex-1 overflow-auto p-4 xl:p-8">
  <div class="flex min-w-fit flex-col gap-4 xl:gap-6">
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

    <div class="flex gap-4">
      <Tabs.Root bind:value={selectedBuilding}>
        <Tabs.List class="ml-auto">
          {#each Object.values(Building) as building}
            <Tabs.Trigger class="px-12 text-zinc-600 dark:text-zinc-200" value={building}>
              {building}
            </Tabs.Trigger>
          {/each}
        </Tabs.List>
      </Tabs.Root>

      <Loader bind:isLoading class="mt-0 w-full" />
    </div>
    <Calendar
      bind:this={ec}
      options={{
        ...calendarOptions,
        view: 'resourceTimeGridDay',
        headerToolbar: {
          start: '',
          center: 'title',
          end: 'prev,next today',
        },
        eventSources: [{ events: fetchEvents({ building: selectedBuilding }) }],
        loading,
        resources: selectedRooms?.map(({ roomId, title }) => ({
          id: roomId,
          title: {
            html: `<a href="/rooms/${roomId}" class="hover:underline">${title}</a>`,
          },
        })),
      }}
      plugins={[ResourceTimeGrid]}
    />
  </div>
  <Toaster />
</main>
