<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let label: string;
	export let icon: any;
</script>

<a
	class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
	class:text-muted-foreground={$page.url.pathname !== href}
	class:text-primary={$page.url.pathname === href}
	class:bg-muted={$page.url.pathname === href}
	{href}
>
	{#if icon}
		<svelte:component this={icon} class="h-4 w-4" />
	{/if}
	{label}
</a>
