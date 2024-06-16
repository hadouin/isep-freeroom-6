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
  import { goto } from '$app/navigation';

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
<main class="flex-1 overflow-auto p-4 md:p-8">
  <div class="flex min-w-fit flex-col gap-4 md:gap-8">
    <div class="flex min-w-[330px] items-center justify-between">
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item class="hidden sm:block">
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

      <Loader bind:isLoading class="mt-0" />

      <div class="flex items-center gap-2 lg:gap-4">
        <Button class="h-8 px-3" on:click={() => goto(`/reservation?room=${room.roomId}`)} variant="secondary">
          Réserver
        </Button>
        <p class="text-right text-sm">À {room.building}, au {floorMap[room.floor]}</p>
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
  </div>
  <Toaster />
</main>
