<script lang="ts">
  import { cn } from '$lib/utils.js';
  import type { HTMLAttributes } from 'svelte/elements';

  type $$Props = HTMLAttributes<HTMLHeadingElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<h1 {...$$restProps}
    class={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}>
	<slot />
</h1>
