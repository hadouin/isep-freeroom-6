<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Card from '$lib/components/ui/card';
  // noinspection ES6UnusedImports
  import * as Tooltip from '$lib/components/ui/tooltip';
  import type { RoomCalendar } from '$lib/rooms';
  import { timeOptions } from '$lib/calendar';

  export let room: RoomCalendar;
  const { roomId, availability } = room;

  function getTimeTo(date: number | string | Date): string {
    date = new Date(date);
    const now = new Date();
    const nowMS = now.getTime() - now.getTimezoneOffset() * 60000;

    const intervalInSec = (date.getTime() - nowMS) / (1000 * 60);

    const hours = Math.trunc(intervalInSec / 60).toString();
    const minutes = Math.trunc(intervalInSec % 60).toString();

    if (hours == '0') {
      return `${minutes}min`;
    }

    return `${hours}h${minutes.padStart(2, '0')}`;
  }
</script>

<Card.Root class="w-full">
  <a href="/rooms/{roomId}">
    <Card.Header>
      <Card.Title>
        {roomId}
      </Card.Title>
      <Card.Description>
        <!--SSR could be streamed: https://svelte.dev/blog/streaming-snapshots-sveltekit -->
        <!--{#await roomPromise}-->
        <!--  <div class="my-1.5 h-2 w-40 animate-pulse rounded bg-slate-200" />-->
        <!--{:then response}-->
        <Tooltip.Root openDelay={300}>
          <Tooltip.Trigger>
            {#if availability.isFree}
              <span class="text-green-500">Libre</span>
              {#if availability.currentEvent}
                <span class="text-gray-500"> pendant {getTimeTo(availability.currentEvent.start)}</span>
              {/if}
            {:else}
              <span class="text-red-500">Occupé</span>
              {#if availability?.currentEvent}
                <span class="text-gray-500"> pendant {getTimeTo(availability.currentEvent.end)}</span>
              {/if}
            {/if}
          </Tooltip.Trigger>
          <Tooltip.Content>
            <!--{#await roomPromise}-->
            <!--  <div class="h-2 w-40 animate-pulse rounded bg-slate-200" />-->
            <!--{:then response}-->
            {#if availability.currentEvent}
              <p>{availability.currentEvent.title}</p>
              <p class="text-gray-500">
                {new Date(availability.currentEvent.start).toLocaleTimeString('fr', timeOptions)}
                - {new Date(availability.currentEvent.end).toLocaleTimeString('fr', timeOptions)}
              </p>
            {:else}
              <span class="text-gray-500">Aucun évent aujourd'hui</span>
            {/if}
            <!--{/await}-->
          </Tooltip.Content>
        </Tooltip.Root>
        <!--{:catch _error}-->
        <!--  <p style="color: red">Erreur lors de la récuperation du calendrier</p>-->
        <!--{/await}-->
      </Card.Description>
    </Card.Header>
    <!--<Card.Content />-->
  </a>
</Card.Root>
