<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLHeadingElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<h3 {...$$restProps}
    class={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>
	<slot />
</h3>
