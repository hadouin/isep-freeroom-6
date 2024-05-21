<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLParagraphElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<p {...$$restProps}
    class={cn('text-xl text-muted-foreground', className)}>
	<slot />
</p>
