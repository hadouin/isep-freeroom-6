<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Card from '$lib/components/ui/card';
  // noinspection ES6UnusedImports
  import * as Tooltip from '$lib/components/ui/tooltip';
  import type { RoomCalendar } from '$lib/rooms';
  import { getTimeTo } from '$lib/time';
  import { dateTimeOptions, timeOptions } from '$lib/calendar';
  import { dev } from '$app/environment';

  export let room: RoomCalendar;
  $: availability = room.availability;
</script>

<Card.Root class="w-full">
  <a href="/rooms/{room.roomId}">
    <Card.Header>
      <Card.Title>
        {room.title}
      </Card.Title>
      <Card.Description>
        <Tooltip.Root openDelay={300}>
          <Tooltip.Trigger>
            {#if availability.isFree}
              <span class="text-green-500">Libre</span>
              {#if availability.currentEvent}
                <span class="text-muted-foreground"> pendant {getTimeTo(availability.currentEvent.start)}</span>
                {#if dev}
                  <br />{availability.currentEvent.start.toLocaleString('fr', dateTimeOptions)}
                  <br />{availability.currentEvent.end.toLocaleString('fr', dateTimeOptions)}
                {/if}
              {/if}
            {:else}
              <span class="text-red-500">Occupé</span>
              {#if availability.currentEvent}
                <span class="text-muted-foreground"> pendant {getTimeTo(availability.currentEvent.end)}</span>
                {#if dev}
                  <br />{availability.currentEvent.start.toLocaleString('fr', dateTimeOptions)}
                  <br />{availability.currentEvent.end.toLocaleString('fr', dateTimeOptions)}
                {/if}
              {/if}
            {/if}
          </Tooltip.Trigger>
          <Tooltip.Content>
            {#if availability.currentEvent}
              <p>{availability.currentEvent.title}</p>
              <p class="text-gray-500">
                {availability.currentEvent.start.toLocaleTimeString('fr', timeOptions)}
                - {availability.currentEvent.end.toLocaleTimeString('fr', timeOptions)}
              </p>
            {:else}
              <span class="text-gray-500">Aucun évent aujourd'hui</span>
            {/if}
          </Tooltip.Content>
        </Tooltip.Root>
      </Card.Description>
    </Card.Header>
  </a>
</Card.Root>
