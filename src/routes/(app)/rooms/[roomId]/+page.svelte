<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Breadcrumb from '$lib/components/ui/breadcrumb';
  import '@event-calendar/core/index.css';
  import Calendar from '@event-calendar/core';
  import ResourceTimeGrid from '@event-calendar/resource-time-grid';
  import { Toaster } from '$lib/components/ui/sonner';
  import { calendarOptions } from '$lib/calendarOptions';
  import { Button } from '$lib/components/ui/button';
  import { Loader } from '$lib/components/loader';
  import { floorMap } from '$lib/rooms';
  import { fetchEvents } from '$lib/calendar';

  export let data;
  $: room = data.room;

  let ec: any;
  $: if (room && ec) ec.refetchEvents();

  let isLoading = true;

  function loading(isLoadingLocal: boolean) {
    isLoading = isLoadingLocal;
  }
</script>

<!-- @TODO: move to /calendar/roomId to put room details on /rooms/roomId -->
<main class="flex flex-1 flex-col gap-4 overflow-y-auto p-4 md:gap-8 md:p-8">
  <div class="flex justify-between">
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Accueil</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/rooms">Salles</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>{room.roomId}</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
    {#if isLoading}
      <Loader class="mt-0" />
    {/if}
    <div class="flex gap-5">
      <p class="text-sm">
        À {room.building}, au {floorMap[room.floor]}
      </p>
      <a href={`/reservation?room=${room.roomId}`}> <Button>Réserver maintenant</Button></a>
    </div>
  </div>

  <Calendar
    bind:this={ec}
    options={{
      ...calendarOptions,
      loading,
      view: 'resourceTimeGridDay',
      headerToolbar: {
        start: 'resourceTimeGridDay,resourceTimeGridWeek',
        center: 'title',
        end: 'prev,next today',
      },
      eventSources: [{ events: fetchEvents({ roomId: room.roomId }) }],
      resources: [{ id: room.roomId, title: { html: `<a href="/rooms/${room.roomId}">${room.title}</a>` } }],
    }}
    plugins={[ResourceTimeGrid]}
  />
  <Toaster />
</main>
