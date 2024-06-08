<script lang="ts">
  import { LoaderCircle } from 'lucide-svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  let className: HTMLAttributes<HTMLDivElement>['class'] = undefined;
  export { className as class };
</script>

<div class={cn('mt-20 flex items-center justify-center space-x-4', className)}>
  <LoaderCircle class="h-10 w-10 animate-spin" />
  <p>Chargement...</p>
</div>
