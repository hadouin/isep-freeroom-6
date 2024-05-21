<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLParagraphElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<p {...$$restProps}
    class={cn('text-sm font-medium leading-none', className)}>
	<slot />
</p>
