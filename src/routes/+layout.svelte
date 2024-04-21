<script>
	import { ModeWatcher } from "mode-watcher";
	import { page } from '$app/stores'
	import '../app.pcss'
	const title = $page.data?.title
</script>

<svelte:head>
	<title>FreeRoom{title ? ` • ${title}` : ''}</title>
</svelte:head>

<ModeWatcher />
<slot />
