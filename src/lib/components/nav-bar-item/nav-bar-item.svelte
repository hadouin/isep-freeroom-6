<script lang="ts">
  import { page } from '$app/stores';
  import type { ComponentType } from 'svelte';

  export let href: string;
  export let label: string;
  export let icon: ComponentType;
  export let reload: boolean = false;
</script>

<a
  data-sveltekit-reload={reload}
  class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary"
  class:bg-muted={$page.url.pathname === href}
  class:text-muted-foreground={$page.url.pathname !== href}
  class:text-primary={$page.url.pathname === href}
  {href}
>
  {#if icon}
    <svelte:component this={icon} class="w-4 h-4" />
  {/if}
  {label}
</a>
