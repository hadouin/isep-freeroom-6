<script lang="ts">
	import * as FormPrimitive from 'formsnap';
	import { cn } from '$lib/utils.js';

	type $$Props = FormPrimitive.FieldErrorsProps & {
		errorClasses?: string | undefined | null;
	};

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let errorClasses: $$Props["class"] = undefined;
</script>

<FormPrimitive.FieldErrors
	{...$$restProps}
	class={cn("text-sm font-medium text-destructive", className)}
	let:errorAttrs
	let:errors
	let:fieldErrorsAttrs
>
	<slot {errorAttrs} {errors} {fieldErrorsAttrs}>
		<!--{#each errors as error}<div {...errorAttrs} class={cn(errorClasses)}>{errors}</div>{/each}-->
    <!--only show a single error at a time:-->
		{#if errors.length !== 0}
			<div {...errorAttrs} class={cn("text-xs", errorClasses)}>{errors[0]}</div>
		{/if}
	</slot>
</FormPrimitive.FieldErrors>
