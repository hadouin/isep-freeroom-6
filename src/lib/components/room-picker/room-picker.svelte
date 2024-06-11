<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Command from '$lib/components/ui/command';
  // noinspection ES6UnusedImports
  import * as Popover from '$lib/components/ui/popover';
  import { cn } from '$lib/utils';
  import { Check, ChevronsUpDown } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';
  import type { Room } from '@prisma/client';
  import type { HTMLAttributes } from 'svelte/elements';

  let className: HTMLAttributes<HTMLDivElement>['class'] = undefined;
  // noinspection ReservedWordAsName
  export { className as class };
  export let rooms: Room[];
  export let attrs: any;
  export let formDataRooms: string[];

  let open = false;
  $: selectedValue =
    rooms
      .filter((room) => formDataRooms.includes(room.roomId))
      ?.map((room) => room.title)
      .join(', ') || 'Choisissez une salle...';

  function onSelect(currentValue: string) {
    if (formDataRooms.includes(currentValue)) {
      formDataRooms = formDataRooms.filter((roomId) => roomId !== currentValue);
    } else {
      formDataRooms = [...formDataRooms, currentValue];
    }
  }
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      {...attrs}
      aria-expanded={open}
      aria-label="Choisissez une ou plusieurs salles"
      builders={[builder]}
      class={cn('relative w-full justify-between', className)}
      role="combobox"
      variant="outline"
    >
      <span class="truncate">{selectedValue}</span>
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0 sm:w-[280px]">
    <Command.Root>
      <Command.Input placeholder="Chercher une salle..." />
      <Command.List>
        <Command.Empty>Aucune salle trouvée</Command.Empty>
        <Command.Group>
          {#each rooms as room}
            <Command.Item value={room.roomId} {onSelect}>
              <Check class={cn('mr-2 h-4 w-4', !formDataRooms.includes(room.roomId) && 'text-transparent')} />
              {room.title}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
{#each formDataRooms as room}
  <input hidden name={attrs.name} value={room} />
{/each}
