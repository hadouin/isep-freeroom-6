<script lang="ts">
	import Search from 'lucide-svelte/icons/search';
	import { Input } from '../ui/input';
	import { goto } from '$app/navigation';

	let search = '';

	export let className: string = '';
</script>

<form on:submit|preventDefault={() => goto(`/rooms/${search}`)}>
	<div class="relative w-full {className}">
		<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
		<Input
			type="search"
			placeholder="Search for a room..."
			class="w-full pl-8 shadow-none appearance-none bg-background"
			bind:value={search}
		/>
	</div>
	<slot />
</form>
