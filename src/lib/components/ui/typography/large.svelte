<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div {...$$restProps}
    class={cn('text-lg font-semibold', className)}>
	<slot />
</div>