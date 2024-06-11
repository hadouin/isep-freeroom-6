<script lang="ts">
  import { goto } from '$app/navigation';
  // noinspection ES6UnusedImports
  import * as Command from '$lib/components/ui/command';
  // noinspection ES6UnusedImports
  import * as Popover from '$lib/components/ui/popover';
  import { cn } from '$lib/utils';
  import Check from 'lucide-svelte/icons/check';
  import { ChevronsUpDown } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';
  import { tick } from 'svelte';
  import type { Room } from '@prisma/client';
  import type { HTMLAttributes } from 'svelte/elements';

  let className: HTMLAttributes<HTMLDivElement>['class'] = undefined;
  let rooms: Room[] = [];
  // noinspection ReservedWordAsName
  export { className as class, rooms };

  let value = '';
  let open = false;
  $: selectedValue = rooms.find((room) => room.roomId === value)?.title || 'Chercher une salle...';
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      aria-expanded={open}
      aria-label="Chercher une salle"
      builders={[builder]}
      class={cn('relative w-full justify-between', className)}
      role="combobox"
      variant="outline"
    >
      {selectedValue}
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
            <Command.Item
              value={room.roomId}
              onSelect={(currentValue) => {
                value = currentValue;
                open = false;
                tick().then(() => document.getElementById(ids.trigger)?.focus());
                goto(`/rooms/${value}`);
              }}
            >
              <Check class={cn('mr-2 h-4 w-4', value !== room.roomId && 'text-transparent')} />
              {room.title}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
