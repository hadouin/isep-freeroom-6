<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';

  export let status: string | undefined = undefined;
</script>

{#if status === undefined}
  <p>n/a</p>
{:else if status === 'admin'}
  <Badge>{status}</Badge>
{:else}
  <Badge variant="secondary">{status}</Badge>
{/if}
