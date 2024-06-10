<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Popover from '$lib/components/ui/popover';
  import { cn } from '$lib/utils';
  import { buttonVariants } from '$lib/components/ui/button';
  import { type DateValue, getLocalTimeZone, parseDate } from '@internationalized/date';
  import { dateOptions } from '$lib/calendar';
  import { CalendarIcon } from 'lucide-svelte';
  import { Calendar } from '$lib/components/ui/calendar';

  export let formDataDate: string | undefined;
  export let minValue: DateValue | undefined;
  export let maxValue: DateValue | undefined;
  export let attrs: any;

  let value: DateValue | undefined;

  $: value = formDataDate ? parseDate(formDataDate) : undefined;
</script>

<Popover.Root>
  <Popover.Trigger
    {...attrs}
    class={cn(
      buttonVariants({ variant: 'outline' }),
      'w-full justify-start pl-4 text-left font-normal',
      !value && 'text-muted-foreground'
    )}
  >
    {value ? value.toDate(getLocalTimeZone()).toLocaleDateString('fr', dateOptions) : 'Choisissez une date'}
    <CalendarIcon class="ml-auto h-4 w-4 opacity-75" />
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0" side="top">
    <Calendar
      calendarLabel="Date de début"
      initialFocus
      locale="fr"
      {maxValue}
      {minValue}
      onValueChange={(v) => {
        if (v) {
          formDataDate = v.toString();
        }
      }}
      {value}
    />
  </Popover.Content>
</Popover.Root>
<input hidden name={attrs.name} value={formDataDate} />
