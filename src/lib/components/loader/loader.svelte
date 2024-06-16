<script lang="ts">
  import { LoaderCircle } from 'lucide-svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  let isLoading = false;
  let className: HTMLAttributes<HTMLDivElement>['class'] = undefined;
  // noinspection ReservedWordAsName
  export { className as class, isLoading };
</script>

<div class={cn('mt-20 flex min-w-0 items-center justify-center space-x-2', className)}>
  {#if isLoading}
    <LoaderCircle class="h-8 w-8 animate-spin lg:h-10 lg:w-10" />
    <p class="truncate">Chargement</p>
  {/if}
</div>
