<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Command from '$lib/components/ui/command';
  // noinspection ES6UnusedImports
  import * as Popover from '$lib/components/ui/popover';
  import { cn } from '$lib/utils';
  import { Clock } from 'lucide-svelte';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import Check from 'lucide-svelte/icons/check';

  export let formDataTime: string;
  export let attrs: any;

  let valueHours: string;
  let openHours = false;
  let valueMinutes: string;
  let openMinutes = false;

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

  $: [valueHours, valueMinutes] = formDataTime.split(':');
</script>

<div class="flex w-full">
  <Popover.Root bind:open={openHours}>
    <Popover.Trigger
      {...attrs}
      aria-label="Choisissez l'heure"
      class={cn(
        buttonVariants({ variant: 'outline' }),
        'relative w-full rounded-e-none border-e-0',
        !valueHours && 'text-muted-foreground'
      )}
    >
      {valueHours ? valueHours : '--'} h
    </Popover.Trigger>
    <Popover.Content class="w-[80px] p-0">
      <Command.Root>
        <Command.List>
          <Command.Group>
            {#each hours as hour}
              <Command.Item
                value={hour}
                onSelect={(currentValue) => {
                  valueHours = currentValue;
                  formDataTime = `${valueHours}:${valueMinutes}`;
                  openHours = false;
                  openMinutes = true;
                }}
              >
                <Check class={cn('mr-2 h-4 w-4', valueHours !== hour && 'text-transparent')} />
                {hour}
              </Command.Item>
            {/each}
          </Command.Group>
        </Command.List>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>

  <Popover.Root bind:open={openMinutes}>
    <Popover.Trigger
      aria-label="Choisissez la minute"
      class={cn(
        buttonVariants({ variant: 'outline' }),
        'relative w-full rounded-e-none rounded-s-none border-e-0',
        !valueMinutes && 'text-muted-foreground'
      )}
    >
      {valueMinutes ? valueMinutes : '--'}
    </Popover.Trigger>
    <Popover.Content class="w-[80px] p-0">
      <Command.Root>
        <Command.List>
          <Command.Group>
            {#each minutes as minute}
              <Command.Item
                value={minute}
                onSelect={(currentValue) => {
                  valueMinutes = currentValue;
                  formDataTime = `${valueHours}:${valueMinutes}`;
                  openMinutes = false;
                }}
              >
                <Check class={cn('mr-2 h-4 w-4', valueMinutes !== minute && 'text-transparent')} />
                {minute}
              </Command.Item>
            {/each}
          </Command.Group>
        </Command.List>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>

  <Button
    aria-label="Ouvre heure et minute"
    class="w-full rounded-l-none"
    on:click={() => {
      if (openHours || openMinutes) {
        openHours = false;
        openMinutes = false;
      } else {
        openHours = true;
        openMinutes = true;
      }
    }}
    tabindex={-1}
    variant="outline"
  >
    <Clock class="ml-auto h-4 w-4 opacity-75" />
  </Button>
</div>
<input hidden name={attrs.name} value={formDataTime} />
