<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLSpanElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<span {...$$restProps}
    class={cn('text-sm text-muted-foreground', className)}>
	<slot />
</span>
