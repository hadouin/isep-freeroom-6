<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLUListElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<ul {...$$restProps}
    class={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}>
	<slot />
</ul>
