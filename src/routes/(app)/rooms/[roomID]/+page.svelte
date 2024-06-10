<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Breadcrumb from '$lib/components/ui/breadcrumb';
  import '@event-calendar/core/index.css';
  // @ts-ignore
  import Calendar from '@event-calendar/core';
  // @ts-ignore
  import ResourceTimeGrid from '@event-calendar/resource-time-grid';
  import { calendarOptions, parseEvents } from '$lib/calendar';
  import { Loader } from '$lib/components/loader';
  import { getRoomById } from '$lib/rooms';

  export let data;

  let plugins = [ResourceTimeGrid];

  $: roomPromise = (async (roomID: string) => await getRoomById(roomID))(data.roomID);
</script>

<main class="flex flex-1 flex-col gap-4 overflow-scroll p-4 md:gap-8 md:p-8">
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
        <Breadcrumb.Page>{data.roomID}</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>

  {#await roomPromise}
    <Loader />
  {:then response}
    {#if !response.room}
      <p class="text-lg">{response.error}</p>
    {:else}
      <Calendar
        {plugins}
        options={{
          ...calendarOptions,
          view: 'resourceTimeGridDay',
          headerToolbar: {
            start: 'resourceTimeGridDay,resourceTimeGridWeek',
            center: 'title',
            end: 'prev,next today',
          },
          events: parseEvents(response.room.events),
          resources: [response.room.resource],
        }}
      />
      <!-- <pre>{JSON.stringify(response, null, 2)}</pre> -->
    {/if}
  {:catch error}
    <p>Error</p>
  {/await}
</main>
