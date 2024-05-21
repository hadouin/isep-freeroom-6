<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLHeadingElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>
<!-- border-b pb-2 -->
<h2 {...$$restProps}
    class={cn('scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0', className)}>
	<slot />
</h2>
