<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLQuoteElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<blockquote {...$$restProps}
    class={cn('mt-6 border-l-2 pl-6 italic text-muted-foreground', className)}>
	<slot />
</blockquote>
