<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Breadcrumb from '$lib/components/ui/breadcrumb';
  import '@event-calendar/core/index.css';
  import Calendar from '@event-calendar/core';
  import ResourceTimeGrid from '@event-calendar/resource-time-grid';
  import { calendarOptions } from '$lib/calendar';
  import { Floor, type Room } from '@prisma/client';
  import { Toaster } from '$lib/components/ui/sonner';

  export let data;

  const room: Room = data.room;

  const floorMap = {
    [Floor.GROUND]: 'rez-de-chaussée',
    [Floor.FIRST]: '1ère étage',
    [Floor.SECOND]: '2ème étage',
    [Floor.THIRD]: '3ème étage',
    [Floor.FOURTH]: '4ème étage',
    [Floor.FIFTH]: '5ème étage',
    [Floor.SIXTH]: '6ème étage',
  };
</script>

<!-- @TODO: move to /calendar/roomId to put room details on /rooms/roomId -->
<main class="flex flex-1 flex-col gap-4 overflow-scroll p-4 md:gap-8 md:p-8">
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
    <p class="text-sm">
      À {room.building}, au {floorMap[room.floor]}
    </p>
  </div>

  <Calendar
    options={{
      ...calendarOptions,
      view: 'resourceTimeGridDay',
      headerToolbar: {
        start: 'resourceTimeGridDay,resourceTimeGridWeek',
        center: 'title',
        end: 'prev,next today',
      },
      eventSources: [
        {
          url: `/api/events?roomId=${room.roomId}`,
          method: 'GET',
        },
      ],
      resources: [{ id: room.roomId, title: { html: `<a href="rooms/${room.roomId}">${room.title}</a>` } }],
    }}
    plugins={[ResourceTimeGrid]}
  />
  <Toaster />
</main>
