<script lang="ts">
  import { page } from '$app/stores';
  import { Badge } from '$lib/components/ui/badge';
  import DataTable from './data-table.svelte';

  export let data;
</script>

<main class="flex flex-1 flex-col gap-4 overflow-auto p-4 md:gap-6 md:p-8">
  <h1 class="text-xl font-bold">Admin <Badge>beta</Badge></h1>
  {#if $page.data?.session}
    <h2 class="text-lg font-bold">👋 Bonjour {$page.data?.session?.cas.attributes?.nomcomplet?._text} !</h2>
  {/if}

  <DataTable data={data.reservations} />
</main>
