<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Card from '$lib/components/ui/card';
  // noinspection ES6UnusedImports
  import * as Tooltip from '$lib/components/ui/tooltip';
  import { getRoomById } from '$lib/rooms';
  import { timeOptions } from '$lib/calendar';

  export let roomId: string;

  $: roomPromise = (async (roomID: string) => await getRoomById(roomID))(roomId);

  const now = new Date();

  function getTimeTo(dateString: Date | string) {
    const date = new Date(dateString);

    const hours = Math.trunc((date.getTime() - now.getTime() + 1000 * 60) / (1000 * 60 * 60)).toString();
    const minutes = Math.trunc(((date.getTime() - now.getTime() + 1000 * 60) / (1000 * 60)) % 60).toString();

    if (hours == '0') {
      return `${minutes}min`;
    }

    return `${hours}h${minutes.padStart(2, '0')}`;
  }
</script>

<Card.Root class="w-full md:w-96">
  <a href="/rooms/{roomId}">
    <Card.Header>
      <Card.Title>
        {roomId}
      </Card.Title>
      <Card.Description>
        {#await roomPromise}
          <div class="my-1.5 h-2 w-40 animate-pulse rounded bg-slate-200"></div>
        {:then response}
          <Tooltip.Root openDelay={300}>
            <Tooltip.Trigger>
              {#if response.room?.availability?.isFree}
                <span class="text-green-500">Libre</span>
                {#if response.room.availability.currentEvent}
                  <span class="text-gray-500"> pendant {getTimeTo(response.room.availability.currentEvent.start)}</span>
                {/if}
              {:else}
                <span class="text-red-500">Occupé</span>
              {/if}
            </Tooltip.Trigger>
            <Tooltip.Content>
              {#await roomPromise}
                <div class="h-2 w-40 animate-pulse rounded bg-slate-200"></div>
              {:then response}
                {#if response.room?.availability?.currentEvent}
                  <p>{response.room.availability.currentEvent.title}</p>
                  <p class="text-gray-500">
                    {new Date(response.room.availability.currentEvent.start).toLocaleTimeString('fr', timeOptions)}
                    - {new Date(response.room.availability.currentEvent.end).toLocaleTimeString('fr', timeOptions)}
                  </p>
                {:else}
                  <span class="text-gray-500">Aucun évent aujourd'hui</span>
                {/if}
              {/await}
            </Tooltip.Content>
          </Tooltip.Root>
        {:catch error}
          <p style="color: red">Erreur lors de la récuperation du calendrier</p>
        {/await}
      </Card.Description>
    </Card.Header>
    <!--		<Card.Content>-->
    <!--		</Card.Content>-->
  </a>
</Card.Root>
