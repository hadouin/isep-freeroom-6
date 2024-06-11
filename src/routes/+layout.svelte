<script>
  import { ModeWatcher } from 'mode-watcher';
  import { page } from '$app/stores';
  import '../app.pcss';

  $: title = $page.data?.title;
</script>

<svelte:head>
  <title>FreeRoom{title ? ` • ${title}` : ''}</title>
  <meta content="FreeRoom, l'application de visualisation et de réservation des salles de l'ISEP." name="description" />
</svelte:head>

<ModeWatcher />
<slot />
