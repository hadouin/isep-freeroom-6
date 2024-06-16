<script lang="ts">
  import { Check, PlusCircle } from 'lucide-svelte';
  // noinspection ES6UnusedImports
  import * as Command from '$lib/components/ui/command';
  // noinspection ES6UnusedImports
  import * as Popover from '$lib/components/ui/popover';
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import { Badge } from '$lib/components/ui/badge';
  import { cn } from '$lib/utils';

  export let filterValues: string[] = [];
  export let title: string;
  export let options: { label: string; value: string }[] = [];

  let open = false;

  function handleSelect(currentValue: string) {
    if (Array.isArray(filterValues) && filterValues.includes(currentValue)) {
      filterValues = filterValues.filter((v) => v !== currentValue);
    } else {
      filterValues = [...(Array.isArray(filterValues) ? filterValues : []), currentValue];
    }
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger asChild let:builder>
    <Button builders={[builder]} class="h-8" variant="outline">
      <PlusCircle class="mr-2 h-4 w-4" />
      {title}
      {#if filterValues.length > 0}
        <Separator orientation="vertical" class="mx-2 h-5" />
        <Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
          {filterValues.length}
        </Badge>
        <div class="hidden space-x-1 lg:flex">
          {#if filterValues.length > 2}
            <Badge variant="secondary" class="rounded-sm px-1 font-normal">
              {filterValues.length} Sélectionnés
            </Badge>
          {:else}
            {#each filterValues as value}
              <Badge variant="secondary" class="rounded-sm px-1 font-normal">
                {options.find((entry) => entry.value === value)?.label}
              </Badge>
            {/each}
          {/if}
        </div>
      {/if}
    </Button>
  </Popover.Trigger>
  <Popover.Content align="start" class="w-[200px] p-0" side="bottom">
    <Command.Root>
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group>
          {#each options as option}
            <Command.Item
              value={option.value}
              onSelect={(currentValue) => {
                handleSelect(currentValue);
              }}
            >
              <div
                class={cn(
                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                  filterValues.includes(option.value)
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible'
                )}
              >
                <Check className={cn('h-4 w-4')} />
              </div>
              <span>
                {option.label}
              </span>
            </Command.Item>
          {/each}
        </Command.Group>
        {#if filterValues.length > 0}
          <Command.Separator />
          <Command.Item
            class="justify-center text-center"
            onSelect={() => {
              filterValues = [];
            }}
          >
            Effacer les filtres
          </Command.Item>
        {/if}
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
