<script lang="ts">
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  // noinspection ES6UnusedImports
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Button } from '$lib/components/ui/button';

  export let id: string;
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button builders={[builder]} class="relative h-8 w-8 p-0" size="icon" variant="ghost">
      <span class="sr-only">Open menu</span>
      <Ellipsis class="h-4 w-4" />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <!-- <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id)}>Copy payment ID</DropdownMenu.Item> -->
      <DropdownMenu.Item>Accepter</DropdownMenu.Item>
      <DropdownMenu.Item>Refuser</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
