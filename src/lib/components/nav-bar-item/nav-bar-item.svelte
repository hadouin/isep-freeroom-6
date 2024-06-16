<script lang="ts">
  import { page } from '$app/stores';
  import type { ComponentType } from 'svelte';
  import { Badge } from '../ui/badge';

  export let href: string;
  export let label: string;
  export let icon: ComponentType;
  export let reload: boolean = false;
  export let badges: string[] = [];
</script>

<a
  class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
  class:bg-muted={$page.url.pathname === href}
  class:text-muted-foreground={$page.url.pathname !== href}
  class:text-primary={$page.url.pathname === href}
  data-sveltekit-reload={reload}
  {href}
>
  {#if icon}
    <svelte:component this={icon} class="h-4 w-4" />
  {/if}
  {label}
  {#each badges as badge}
    <Badge>{badge}</Badge>
  {/each}
</a>
